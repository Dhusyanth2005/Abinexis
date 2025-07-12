const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// In-memory store for OTPs and hashed passwords (replace with database in production)
let otpStore = {};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    text: `Your OTP for registration is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  // Store hashed password and OTP
  otpStore[email] = { otp, hashedPassword, expires: Date.now() + 10 * 60 * 1000 }; // 10-minute expiration
  await sendOTP(email, otp);
  res.status(200).json({ message: 'OTP sent to your email. Please verify.' });
};

const verifyOTP = async (req, res) => {
  const { email, otp, name } = req.body;
  const storedOTP = otpStore[email];

  if (!storedOTP || Date.now() > storedOTP.expires || storedOTP.otp !== otp) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Use the stored hashed password from otpStore
  const user = await User.create({
    name,
    email,
    password: storedOTP.hashedPassword, // Use the pre-hashed password
    isAdmin: false, // Hardcode isAdmin to false for security
  });
  delete otpStore[email]; // Clear OTP and hashed password after successful verification
  if (user) {
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(201).json({ token });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const setAdmin = async (req, res) => {
  const { userId } = req.body;
  const adminUser = await User.findById(req.user.id);
  if (!adminUser || !adminUser.isAdmin) {
    return res.status(403).json({ message: 'Only admins can set admin status' });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.isAdmin = true;
  await user.save();
  res.json({ message: 'User set as admin successfully' });
};

module.exports = { register, login, setAdmin, verifyOTP };