// src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to validate email format
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Helper function to generate JWT
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing JWT secret in environment variables');
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup handler
exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        // Check if user already exists by email or phone
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email or phone number' });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);

        // Optionally, set the token as an HTTP-only cookie (safer for client-side)
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(201).json({ userId: user._id, name: user.name, token }); // Return user ID, name, and token
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Login handler
exports.login = async (req, res) => {
    const { phone, password } = req.body;

    // Validate input
    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone number and password are required' });
    }

    try {
        // Check if user exists by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Ensure the response includes userId and name along with token
        return res.status(200).json({
            userId: user._id,  // Include user ID
            name: user.name,   // Include user name
            token: token       // JWT token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
