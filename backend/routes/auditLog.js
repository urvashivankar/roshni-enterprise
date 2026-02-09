const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const User = require('../models/User');
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        req.adminUser = user;
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Helper function to log admin actions
const logAction = async (adminId, adminEmail, action, targetType, targetId, details, req) => {
    try {
        const auditLog = new AuditLog({
            adminId,
            adminEmail,
            action,
            targetType,
            targetId,
            details,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent')
        });
        await auditLog.save();
    } catch (err) {
        console.error('Audit log error:', err);
    }
};

// @route   GET /api/audit-logs
// @desc    Get audit logs with filters
// @access  Private (Admin only)
router.get('/', auth, isAdmin, async (req, res) => {
    try {
        const { action, startDate, endDate, limit = 50, page = 1 } = req.query;

        const query = {};
        if (action) query.action = action;
        if (startDate || endDate) {
            query.timestamp = {};
            if (startDate) query.timestamp.$gte = new Date(startDate);
            if (endDate) query.timestamp.$lte = new Date(endDate);
        }

        const logs = await AuditLog.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .populate('adminId', 'email');

        const total = await AuditLog.countDocuments(query);

        res.json({
            logs,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/audit-logs
// @desc    Create audit log (used by other routes)
// @access  Private (Admin only)
router.post('/', auth, isAdmin, async (req, res) => {
    try {
        const { action, targetType, targetId, details } = req.body;

        await logAction(
            req.user.id,
            req.adminUser.email,
            action,
            targetType,
            targetId,
            details,
            req
        );

        res.json({ message: 'Audit log created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the logAction helper for use in other routes
router.logAction = logAction;

module.exports = router;
