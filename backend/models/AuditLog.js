const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'LOGIN',
            'LOGOUT',
            'BOOKING_STATUS_CHANGE',
            'BOOKING_CANCEL',
            'USER_CREATE',
            'USER_DELETE',
            'REPORT_GENERATE',
            'SETTINGS_UPDATE',
            'OTHER'
        ]
    },
    targetType: {
        type: String,
        enum: ['Booking', 'User', 'Report', 'Settings', 'System']
    },
    targetId: {
        type: String
    },
    details: {
        type: mongoose.Schema.Types.Mixed
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

// Compound index for efficient filtering
AuditLogSchema.index({ adminId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
