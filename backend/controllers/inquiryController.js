const Inquiry = require('../models/Inquiry');
const jwt = require('jsonwebtoken');

/**
 * Inquiry Controller
 * Handles business logic for corporate B2B leads
 */

// @desc    Create a specialized B2B lead
// @route   POST /api/bookings/corporate-lead
exports.createCorporateInquiry = async (req, res) => {
    try {
        const { companyName, contactPerson, email, phone, requirements, additionalNotes } = req.body;

        // Link to user if token exists
        let userId = null;
        let authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.user) {
                    userId = decoded.user.id;
                }
            } catch (err) { }
        }

        const newInquiry = new Inquiry({
            userId,
            companyName,
            contactPerson,
            email,
            phone,
            requirements,
            additionalNotes
        });

        const savedInquiry = await newInquiry.save();

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('newCorporateInquiry', savedInquiry);
        }

        res.status(201).json(savedInquiry);
    } catch (err) {
        console.error('Error logging corporate lead:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get logged-in user's corporate inquiries
// @route   GET /api/bookings/my-inquiries
exports.getMyInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error('Error fetching my inquiries:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all corporate inquiries (Admin only)
// @route   GET /api/bookings/inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error('Error fetching inquiries:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update inquiry status (Admin only)
// @route   PATCH /api/bookings/inquiries/:id/status
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status, adminNotes },
            { new: true, runValidators: true }
        );

        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

        // Broadcast update
        const io = req.app.get('io');
        if (io) io.emit('inquiryStatusUpdated', inquiry);

        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Send PDF Quotation
// @route   POST /api/bookings/inquiries/:id/send-quotation
exports.sendQuotation = async (req, res) => {
    try {
        const { amount, notes } = req.body;
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
        if (!req.file) return res.status(400).json({ message: 'Quotation PDF is required' });

        const pdfUrl = `/uploads/quotations/${req.file.filename}`;

        inquiry.quotation = {
            amount: amount ? Number(amount) : undefined,
            notes,
            pdfUrl,
            sentAt: new Date()
        };
        inquiry.status = 'Quotation Sent';
        await inquiry.save();

        // Broadcast update
        const io = req.app.get('io');
        if (io) io.emit('inquiryStatusUpdated', inquiry);

        res.json({ message: 'Quotation delivered successfully', inquiry });
    } catch (err) {
        console.error('Error delivering quotation:', err);
        res.status(500).json({ message: 'Failed to deliver quotation' });
    }
};
