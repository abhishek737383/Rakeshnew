// src/routes/adminRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();
const { loginAdmin, signupAdmin , getAllUsers } = require('../controllers/adminController');

// Ensure the functions are correctly referenced
router.post('/login', loginAdmin);
router.post('/signup', signupAdmin);

// Route to get all users with pagination
router.get('/users', getAllUsers);


// Get all carts for admin
router.get('/all-carts', async (req, res) => {
  try {
    const carts = await Cart.find().populate('userId').populate('products.productId');
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
