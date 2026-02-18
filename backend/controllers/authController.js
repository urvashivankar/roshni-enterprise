const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Auth Controller
 * Handles user registration, login, and retrieval
 */

// @desc    Register user
// @route   POST api/auth/register
exports.register = async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    // Validate password length strictly to 8 characters
    if (!password || password.length !== 8) {
        return res.status(400).json({ message: 'Password must be exactly 8 characters' });
    }

    try {
        let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

        if (user) {
            return res.status(400).json({ message: 'User already exists with this email or phone number' });
        }

        user = new User({
            email,
            phoneNumber,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST api/auth/login
exports.login = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' can be email or phone

    try {
        // Find user by email OR phone number
        let user = await User.findOne({
            $or: [
                { email: identifier },
                { phoneNumber: identifier }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get logged in user
// @route   GET api/auth/user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
