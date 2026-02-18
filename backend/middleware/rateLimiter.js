const rateLimit = require('express-rate-limit');

/**
 * Rate limiting middleware to prevent abuse
 * 100 requests per 15 minutes per IP
 */

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes',
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers

    // Skip rate limiting for successful requests
    skipSuccessfulRequests: false,

    // Custom handler for rate limit exceeded
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests',
            message: 'You have exceeded the 100 requests in 15 minutes limit!',
            retryAfter: '15 minutes'
        });
    }
});

// Stricter rate limiter for auth routes (login/signup)
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // Only 10 attempts per 15 minutes
    message: {
        message: 'Too many authentication attempts, please try again after 15 minutes'
    },
    skipSuccessfulRequests: true,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many login attempts',
            message: 'Please try again after 15 minutes',
            retryAfter: '15 minutes'
        });
    }
});

module.exports = {
    rateLimiter,
    authRateLimiter
};
