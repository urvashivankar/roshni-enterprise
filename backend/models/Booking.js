const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
