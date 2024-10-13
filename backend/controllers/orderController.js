// backend/controllers/orderController.js
const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  const { userId, cartItems, courierDetails } = req.body; // Destructure userId from the request body

  try {
    // Calculate the total amount
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create the new order
    const newOrder = new Order({
      userId, // Include userId to associate the order with the user
      cartItems: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image, // Include image URL here
      })),
      courierDetails,
      totalAmount,
    });

    // Save the order to the database
    await newOrder.save();

    // Return the created order
    res.status(201).json(newOrder);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createOrder,
  // You can add more functions for retrieving or updating orders as needed
};
