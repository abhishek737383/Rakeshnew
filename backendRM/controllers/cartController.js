// src/controllers/CartController.js

const Cart = require('../models/Cart'); // Assuming you have a Cart model

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { productId, name, price, quantity } = req.body;
  try {
    const cartItem = await Cart.findOneAndUpdate(
      { productId },
      { $inc: { quantity: quantity }, name, price },
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
  }
};

// Fetch all cart items
exports.fetchCartItems = async (req, res) => {
  try {
    const items = await Cart.find(); // Fetch all cart items
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Failed to fetch cart items' });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    await Cart.deleteOne({ productId }); // Assuming productId is unique
    return res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
  }
};

// Update item quantity in cart
exports.updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    await Cart.updateOne({ productId }, { quantity });
    return res.status(200).json({ success: true, message: 'Quantity updated' });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return res.status(500).json({ success: false, message: 'Failed to update quantity' });
  }
};
