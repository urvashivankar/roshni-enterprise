const Review = require('../models/Review');
const Booking = require('../models/Booking');

/**
 * @desc    Submit a review for a booking
 * @route   POST /api/reviews
 * @access  Private
 */
const submitReview = async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;
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
};

/**
 * @desc    Get all reviews (for testimonials)
 * @route   GET /api/reviews
 * @access  Public
 */
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error while fetching reviews' });
    }
};

module.exports = {
    submitReview,
    getReviews
};
