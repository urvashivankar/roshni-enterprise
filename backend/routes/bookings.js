const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Inquiry = require('../models/Inquiry');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads', 'quotations');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
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

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET /api/bookings - Get all bookings (Protected - Admin only)
router.get('/', auth, admin, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/bookings/my-bookings - Get logged-in user's bookings
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching my bookings:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    try {
        const { service, date, time, name, phone, area } = req.body;

        // Basic validation
        if (!service || !date || !time || !name || !phone || !area) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Optional: Check for token to link user
        let userId = null;
        let authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.user) {
                    userId = decoded.user.id;
                    console.log('Linked booking to user:', userId);
                }
            } catch (err) {
                console.log('Invalid token provided for booking - continuing as guest');
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
            console.log('Broadcasted new booking event');
        }

        // Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Booking: ${service} - ${name}`,
            text: `
                New Booking Alert!
                
                Service: ${service}
                Customer: ${name}
                Phone: ${phone}
                Area: ${area}
                Date: ${date}
                Time: ${time}
                Linked Account: ${userId ? 'Yes' : 'No (Guest)'}
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.log('Error sending email:', error);
            });
        }

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/bookings/corporate-lead - Create a specialized B2B lead
router.post('/corporate-lead', async (req, res) => {
    console.log('Received Corporate Lead Inquiry:', req.body);
    try {
        const { companyName, contactPerson, email, phone, requirements, additionalNotes } = req.body;

        if (!companyName || !contactPerson || !phone || !requirements) {
            console.log('Validation Failed: Missing fields');
            return res.status(400).json({ message: 'Essential fields are missing.' });
        }

        // Optional: Check for token to link user
        let userId = null;
        let debugStatus = 'Checking...';
        let authHeader = req.header('Authorization');
        console.log('Incoming Authorization Header:', authHeader ? 'Present' : 'Missing');

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            console.log('Token extracted, verifying...');
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log('Token Decoded:', !!decoded);
                if (decoded && decoded.user) {
                    userId = decoded.user.id;
                    debugStatus = 'SUCCESS: Linked to ' + userId;
                    console.log('SUCCESS: Linked corporate lead to user:', userId);
                } else {
                    debugStatus = 'FAIL: No user in token';
                    console.log('FAIL: Decoded token missing user info');
                }
            } catch (err) {
                debugStatus = 'FAIL: JWT Error - ' + err.message;
                console.log('FAIL: JWT Verification Error:', err.message);
            }
        } else {
            debugStatus = 'FAIL: No Bearer header';
            console.log('No Bearer token found in header');
        }

        if (!userId) {
            console.log('Proceeding as Guest submission.');
        }

        const newInquiry = new Inquiry({
            userId,
            companyName,
            contactPerson,
            email,
            phone,
            requirements,
            additionalNotes,
            adminNotes: 'SYSTEM_DEBUG: ' + debugStatus // Use existing field for debug
        });

        const savedInquiry = await newInquiry.save();

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('newCorporateInquiry', savedInquiry);
            console.log('Broadcasted new corporate inquiry event');
        }

        // Send Detailed B2B Email Notification
        const requirementsText = requirements.map(r => `- ${r.type}: ${r.units} unit(s)`).join('\n');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🏢 CORPORATE INQUIRY: ${companyName}`,
            text: `
                New B2B Corporate Lead Received!
                
                Company: ${companyName}
                Contact: ${contactPerson}
                Email: ${email || 'Not provided'}
                Phone: ${phone}
                Linked Account: ${userId ? 'Yes' : 'No'}
                
                Service Requirements:
                ${requirementsText}
                
                Additional Notes:
                ${additionalNotes || 'No extra notes.'}
                
                -------------------------------
                Priority: HIGH - Multi-unit/Institutional Inquiry
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending corporate lead email:', error);
                } else {
                    console.log('Corporate lead email sent successfully');
                }
            });
        } else {
            console.log('Email credentials missing - skipping email notification');
        }

        res.status(201).json(savedInquiry);
    } catch (err) {
        console.error('Error logging corporate lead:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// GET /api/bookings/my-inquiries - Get logged-in user's corporate inquiries
router.get('/my-inquiries', auth, async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error('Error fetching my inquiries:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/bookings/inquiries - Get all corporate inquiries (Protected - Admin only)
router.get('/inquiries', auth, admin, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error('Error fetching inquiries:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PATCH /api/bookings/inquiries/:id/status - Update inquiry status (Protected - Admin only)
router.patch('/inquiries/:id/status', auth, admin, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status, adminNotes },
            { new: true }
        );
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });

        // Broadcast update
        const io = req.app.get('io');
        if (io) io.emit('inquiryStatusUpdated', inquiry);

        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/bookings/inquiries/:id/send-quotation - Send PDF Quotation (Protected)
router.post('/inquiries/:id/send-quotation', auth, upload.single('pdf'), async (req, res) => {
    console.log('--- Send Quotation Request Started ---');
    console.log('Inquiry ID:', req.params.id);
    try {
        const { amount, notes } = req.body;
        console.log('Body data - Amount:', amount, 'Notes:', notes);

        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            console.log('Error: Inquiry not found in DB');
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        if (!req.file) {
            console.log('Error: No file uploaded (Multer failed or PDF not provided)');
            return res.status(400).json({ message: 'Quotation PDF is required' });
        }

        console.log('File uploaded successfully:', req.file.filename);

        const pdfUrl = `/uploads/quotations/${req.file.filename}`;

        // Update inquiry
        inquiry.quotation = {
            amount: amount ? Number(amount) : undefined,
            notes,
            pdfUrl,
            sentAt: new Date()
        };
        inquiry.status = 'Quotation Sent';
        await inquiry.save();

        // Send Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: inquiry.email,
            subject: `📋 PDF Quotation for ${inquiry.companyName} - Roshni Enterprise`,
            text: `
                Dear ${inquiry.contactPerson},
                
                Thank you for your inquiry with Roshni Enterprise.
                
                We have prepared a formal quotation for your requirements. 
                You can view/download your quotation here: ${process.env.FRONTEND_URL || 'http://localhost:5173'}${pdfUrl}
                
                Alternatively, log in to your dashboard to view all details.
                
                Regards,
                Management, Roshni Enterprise
            `
        };

        if (inquiry.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail(mailOptions);
        }

        // Broadcast update
        const io = req.app.get('io');
        if (io) io.emit('inquiryStatusUpdated', inquiry);

        res.json({ message: 'Quotation delivered successfully', inquiry });
    } catch (err) {
        console.error('Error delivering quotation:', err);
        res.status(500).json({ message: 'Failed to deliver quotation' });
    }
});

// Update booking status (Admin only)
router.patch('/:id/status', auth, admin, async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body, // Use req.body to allow updating other fields if needed, not just status
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Real-time broadcast
        const io = req.app.get('io');
        if (io) {
            io.emit('bookingStatusUpdated', updatedBooking);
            console.log('Broadcasted status update event');
        }

        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
