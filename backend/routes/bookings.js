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

// GET /api/bookings - Get all bookings (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
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

        const newBooking = new Booking({
            service,
            date,
            time,
            name,
            phone,
            area
        });

        const savedBooking = await newBooking.save();

        // Send Email Notification (Async - don't block response)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self/admin for now
            subject: `New Booking: ${service} - ${name}`,
            text: `
                New Booking Alert!
                
                Service: ${service}
                Customer: ${name}
                Phone: ${phone}
                Area: ${area}
                Date: ${date}
                Time: ${time}
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
