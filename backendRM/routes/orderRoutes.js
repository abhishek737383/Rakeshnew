const express = require('express');
const multer = require('multer');
const router = express.Router();
const Order = require('../models/Order');

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware for validating userId
const validateUserId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  next();
};

// Middleware for validating courier details
const validateCourierDetails = (req, res, next) => {
  const { fullName, contactNo, city, state, pincode, address, size } = req.body.courierDetails;
  if (!fullName || !contactNo || !city || !state || !pincode || !address || !size) {
    return res.status(400).json({ message: 'All courier details are required.' });
  }
  const contactNoRegex = /^\d{10}$/;
  const pincodeRegex = /^\d{6}$/;
  if (!contactNoRegex.test(contactNo)) {
    return res.status(400).json({ message: 'Invalid contact number format.' });
  }
  if (!pincodeRegex.test(pincode)) {
    return res.status(400).json({ message: 'Invalid pincode format.' });
  }
  next();
};

// Middleware for validating cart items
const validateCartItems = (req, res, next) => {
  const { cartItems } = req.body;
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart items are required.' });
  }
  cartItems.forEach(item => {
    if (!item.productId || !item.name || !item.price || !item.quantity || !item.image) {
      return res.status(400).json({ message: 'Invalid cart item structure.' });
    }
  });
  next();
};

// Create a new order
router.post('/', upload.single('screenshot'), validateUserId, validateCourierDetails, validateCartItems, async (req, res) => {
  const { userId, cartItems, courierDetails, transactionId, upiId } = req.body;
  const screenshot = req.file ? req.file.path : null;

  try {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = new Order({
      userId,
      cartItems,
      courierDetails,
      transactionId,
      upiId,
      screenshot,
      totalAmount,
      status: 'Pending'
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Order creation failed.', error: error.message });
  }
});

// Get orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
  }
});
// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    res.status(500).json({ message: 'Error fetching user orders.', error: error.message });
  }
});


// Update order status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Accepted', 'Delivered', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found.' });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Error updating order status.', error: error.message });
  }
});
// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: 'Error deleting order.', error: error.message });
  }
});

module.exports = router;
