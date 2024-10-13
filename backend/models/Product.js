const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  category: { type: String, required: true },
  isFeatured: { type: Boolean, default: false } // Add this field
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
