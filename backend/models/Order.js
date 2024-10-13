// backend/models/Order.js
const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  // Link to User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // userId is required
  },
  // Array of cart items
  cartItems: [
    {
      // Reference to Product model
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true, // Ensure productId is required
      },
      name: {
        type: String,
        required: true, // Ensure name is provided
      },
      price: {
        type: Number,
        required: true, // Ensure price is provided
      },
      quantity: {
        type: Number,
        required: true, // Ensure quantity is provided
      },
      image: {
        type: String,
        required: true, // Ensure image URL is provided
      },
    },
  ],
  // Courier details for delivery
  courierDetails: {
    fullName: {
      type: String,
      required: true, // Ensure full name is provided
    },
    contactNo: {
      type: String,
      required: true, // Ensure contact number is provided
    },
    city: {
      type: String,
      required: true, // Ensure city is provided
    },
    state: {
      type: String,
      required: true, // Ensure state is provided
    },
    pincode: {
      type: String,
      required: true, // Ensure pincode is provided
    },
    address: {
      type: String,
      required: true, // Ensure address is provided
    },
    size: {
      type: String,
      required: true, // Ensure size is provided (can be useful for clothing)
    },
  },
  // Total amount for the order
  totalAmount: {
    type: Number,
    required: true, // Ensure total amount is provided
  },
  // Status of the order (e.g., Pending, Accepted, Delivered, Rejected)
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Delivered', 'Rejected'], // Allowed values for status
    default: 'Pending', // Default status is Pending
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);
