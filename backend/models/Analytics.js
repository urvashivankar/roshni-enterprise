const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        index: true
    },
    totalBookings: {
        type: Number,
        default: 0
    },
    completedBookings: {
        type: Number,
        default: 0
    },
    canceledBookings: {
        type: Number,
        default: 0
    },
    pendingBookings: {
        type: Number,
        default: 0
    },
    revenue: {
        type: Number,
        default: 0
    },
    avgResponseTime: {
        type: Number, // in minutes
        default: 0
    },
    serviceBreakdown: [{
        service: String,
        count: Number,
        revenue: Number
    }],
    hourlyDistribution: [{
        hour: Number, // 0-23
        bookingCount: Number
    }],
    customerMetrics: {
        newCustomers: { type: Number, default: 0 },
        returningCustomers: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

// Index for efficient date-range queries
AnalyticsSchema.index({ date: 1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
