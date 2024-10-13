// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authenticate = require('../middleware/auth'); // Import the authentication middleware

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Protected route example (you can add more routes as needed)
router.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
