// src/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', CartController.addItemToCart);

// Fetch cart items
router.get('/items', CartController.fetchCartItems);

// Remove item from cart
router.delete('/remove', CartController.removeItemFromCart);

// Update item quantity in cart
router.put('/update', CartController.updateCartItemQuantity);

module.exports = router;
