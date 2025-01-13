// src/controllers/userController.js
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure you're attaching the user info to the request in a middleware
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Server error');
    }
};
