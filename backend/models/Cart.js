// src/models/Cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model('Cart', cartSchema);
