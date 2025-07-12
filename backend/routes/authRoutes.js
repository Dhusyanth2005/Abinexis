const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { register, login, setAdmin, verifyOTP } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/set-admin', protect, admin, setAdmin);
router.post('/verify-otp', verifyOTP);

module.exports = router;