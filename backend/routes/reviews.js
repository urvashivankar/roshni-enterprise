const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const { validateReview } = require('../middleware/validation');
const auth = require('../middleware/auth');
const { rateLimiter } = require('../middleware/rateLimiter');

// @route   POST /api/reviews
// @desc    Submit a review for a booking
// @access  Private
router.post('/', rateLimiter, auth, validateReview, submitReview);

// @route   GET /api/reviews
// @desc    Get all reviews (for testimonials)
// @access  Public
router.get('/', getReviews);

module.exports = router;
