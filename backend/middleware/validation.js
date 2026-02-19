const { body, validationResult } = require('express-validator');

/**
 * Centralized validation middleware
 * Returns clean, user-friendly error messages
 */

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = {};
        errors.array().forEach(err => {
            errorMessages[err.path || err.param] = err.msg;
        });

        return res.status(400).json({
            message: 'Validation failed',
            errors: errorMessages
        });
    }
    next();
};

// Booking validation middleware
const validateBooking = [
    body('service')
        .notEmpty().withMessage('Please select a service')
        .trim()
        .escape(),

    body('date')
        .notEmpty().withMessage('Please select a date')
        .isISO8601().withMessage('Invalid date format'),

    body('time')
        .notEmpty().withMessage('Please select a time slot')
        .trim(),

    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Name must be between 2 and 30 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
        .trim()
        .escape(),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits'),

    body('area')
        .notEmpty().withMessage('Area is required')
        .isLength({ min: 5, max: 100 }).withMessage('Area must be between 5 and 100 characters')
        .trim()
        .escape(),

    handleValidationErrors
];

// Corporate inquiry validation middleware
const validateCorporateInquiry = [
    body('companyName')
        .notEmpty().withMessage('Company name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters')
        .trim()
        .escape(),

    body('contactPerson')
        .notEmpty().withMessage('Contact person name is required')
        .isLength({ min: 2, max: 30 }).withMessage('Name must be between 2 and 30 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
        .trim()
        .escape(),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .isLength({ max: 25 }).withMessage('Email cannot exceed 25 characters')
        .normalizeEmail(),

    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/).withMessage('Phone number must be exactly 10 digits'),

    body('requirements')
        .isArray({ min: 1 }).withMessage('Please add at least one service requirement')
        .custom((requirements) => {
            requirements.forEach(req => {
                if (!req.type || !req.units) {
                    throw new Error('Each requirement must have type and units');
                }
                if (req.units < 1 || req.units > 1000) {
                    throw new Error('Units must be between 1 and 1000');
                }
            });
            return true;
        }),

    body('additionalNotes')
        .optional()
        .isLength({ max: 500 }).withMessage('Additional notes cannot exceed 500 characters')
        .trim()
        .escape(),

    handleValidationErrors
];

// Review validation middleware
const validateReview = [
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

    body('comment')
        .notEmpty().withMessage('Comment is required')
        .isLength({ min: 10, max: 500 }).withMessage('Comment must be between 10 and 500 characters')
        .trim()
        .escape(),

    handleValidationErrors
];

// Login validation middleware
const validateLogin = [
    body('identifier')
        .notEmpty().withMessage('Email or Phone is required')
        .trim(),

    body('password')
        .notEmpty().withMessage('Password is required'),

    handleValidationErrors
];

// Register validation middleware
const validateRegister = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    handleValidationErrors
];

module.exports = {
    validateBooking,
    validateCorporateInquiry,
    validateReview,
    validateLogin,
    validateRegister,
    handleValidationErrors
};
