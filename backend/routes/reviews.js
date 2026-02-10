const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// @route   POST /api/reviews
// @desc    Submit a review for a booking
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;

        // Use the userId from the token
        const userId = req.user.id;

        // Check if booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Get name from booking if not in user
        const userName = req.user.name || booking.name || 'Valued Customer';

        // Create new review
        const review = new Review({
            bookingId,
            userId,
            userName,
            rating,
            comment
        });

        await review.save();

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('newReview', review);
            console.log('Broadcasted new review event');
        }

        res.status(201).json(review);
    } catch (err) {
        console.error('Review Error:', err.message);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Feedback already submitted for this booking.' });
        }
        res.status(500).json({ message: 'Server error while submitting feedback' });
    }
});

// @route   GET /api/reviews
// @desc    Get all reviews (for testimonials)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error while fetching reviews' });
    }
});

module.exports = router;
