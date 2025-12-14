const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

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
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error('Error saving booking:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
