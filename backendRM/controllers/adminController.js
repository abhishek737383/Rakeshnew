const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
};

const signupAdmin = (req, res) => {
  const { secretKey } = req.body;
  const adminSecretKey = 'mySecretKey'; // Example secret key

  if (secretKey === adminSecretKey) {
    res.json({ success: true, message: 'Signup successful' });
  } else {
    res.json({ success: false, message: 'Invalid secret key' });
  }
};
// src/controllers/adminController.js

const User = require('../models/User');

// Get all users with pagination
const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values: page 1, 10 users per page
  try {
    const users = await User.find()
      .select('name email phone') // Only return necessary fields
      .skip((page - 1) * limit) // Skip users of previous pages
      .limit(parseInt(limit)); // Limit the number of users per page

    const totalUsers = await User.countDocuments(); // Total number of users

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit), // Calculate total pages
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};


module.exports = { loginAdmin, signupAdmin , getAllUsers};
