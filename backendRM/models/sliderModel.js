const mongoose = require('mongoose');

// Define the schema for Slider images
const sliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
});

module.exports = mongoose.model('Slider', sliderSchema);
