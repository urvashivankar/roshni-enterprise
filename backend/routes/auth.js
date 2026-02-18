const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { authRateLimiter } = require('../middleware/rateLimiter');

// Controllers
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
router.post('/register', authRateLimiter, validateRegister, authController.register);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authRateLimiter, validateLogin, authController.login);

// @route   GET api/auth/user
// @desc    Get logged in user
router.get('/user', auth, authController.getUser);

module.exports = router;
