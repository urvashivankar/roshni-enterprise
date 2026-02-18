const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: {
        type: String,
        required: [true, 'Service type is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time slot is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name is too short'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Phone number must be exactly 10 digits']
    },
    area: {
        type: String,
        required: [true, 'Area/Address is required'],
        minlength: [5, 'Address is too short'],
        maxlength: [100, 'Address is too long'],
        trim: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled']
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
