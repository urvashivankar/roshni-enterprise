const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

/**
 * Booking Controller
 * Handles all business logic for service bookings
 */

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my-bookings
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching my bookings:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const { service, date, time, name, phone, area } = req.body;

        // Optional: Check for token to link user
        let userId = null;
        let authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.user) {
                    userId = decoded.user.id;
                }
            } catch (err) {
                // Invalid token - continue as guest
            }
        }

        const newBooking = new Booking({
            service,
            date,
            time,
            name,
            phone,
            area,
            userId
        });

        const savedBooking = await newBooking.save();

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('newBooking', savedBooking);
        }

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update booking status (Admin only)
// @route   PATCH /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('bookingStatusUpdated', updatedBooking);
        }

        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
