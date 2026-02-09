const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET /api/bookings - Get all bookings (Protected - Admin only check should be here ideally)
router.get('/', auth, async (req, res) => {
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
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            try {
                const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
                userId = decoded.user.id;
            } catch (err) {
                // Ignore invalid token for booking creation, treat as guest
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

        res.status(201).json({ message: 'Corporate lead logged successfully.' });
    } catch (err) {
        console.error('Error logging corporate lead:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Update booking status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
