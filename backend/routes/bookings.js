const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middlewares
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { validateBooking, validateCorporateInquiry } = require('../middleware/validation');
const { rateLimiter } = require('../middleware/rateLimiter');

// Controllers
const bookingController = require('../controllers/bookingController');
const inquiryController = require('../controllers/inquiryController');

// Multer Storage Configuration for Corporate Quotations
const uploadDir = path.join(__dirname, '..', 'uploads', 'quotations');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'quotation-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDFs are allowed'), false);
        }
    }
});

// --- Booking Routes ---

// @route   GET /api/bookings
// @desc    Get all bookings (Admin only)
router.get('/', auth, admin, bookingController.getAllBookings);

// @route   GET /api/bookings/my-bookings
// @desc    Get logged-in user's bookings
router.get('/my-bookings', auth, bookingController.getMyBookings);

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', rateLimiter, validateBooking, bookingController.createBooking);

// @route   PATCH /api/bookings/:id/status
// @desc    Update booking status (Admin only)
router.patch('/:id/status', auth, admin, bookingController.updateBookingStatus);


// --- Corporate Inquiry Routes ---

// @route   POST /api/bookings/corporate-lead
// @desc    Create a corporate lead
router.post('/corporate-lead', rateLimiter, validateCorporateInquiry, inquiryController.createCorporateInquiry);

// @route   GET /api/bookings/my-inquiries
// @desc    Get logged-in user's inquiries
router.get('/my-inquiries', auth, inquiryController.getMyInquiries);

// @route   GET /api/bookings/inquiries
// @desc    Get all inquiries (Admin only)
router.get('/inquiries', auth, admin, inquiryController.getAllInquiries);

// @route   PATCH /api/bookings/inquiries/:id/status
// @desc    Update inquiry status (Admin only)
router.patch('/inquiries/:id/status', auth, admin, inquiryController.updateInquiryStatus);

// @route   POST /api/bookings/inquiries/:id/send-quotation
// @desc    Send PDF quotation (Admin only)
router.post('/inquiries/:id/send-quotation', auth, admin, upload.single('pdf'), inquiryController.sendQuotation);

module.exports = router;
