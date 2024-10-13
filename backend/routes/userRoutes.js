// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust the path as needed
const verifyToken = require('../middleware/auth'); // Adjust the path as needed
const User = require('../models/User'); // Your User model

// Define your routes
router.get('/profile', verifyToken, userController.getUserProfile); // This should work without app being referenced

router.get('/users', verifyToken, async (req, res) => {

    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
module.exports = router; // Export the router
