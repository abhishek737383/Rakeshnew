const Slider = require('../models/sliderModel');
const path = require('path');
const fs = require('fs');

// Upload slider image
exports.uploadImage = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `/uploads/sliders/${file.filename}`;  // Use slider folder path
  const newSlider = new Slider({ imageUrl });

  try {
    await newSlider.save();
    res.status(201).json({ message: 'Image uploaded successfully', slider: newSlider });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete slider image
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ message: 'Image not found' });

    const imagePath = path.join(__dirname, '../uploads/sliders', path.basename(slider.imageUrl));  // Adjusted to match slider image path
    fs.unlink(imagePath, (err) => {
      if (err) throw err;
    });

    await Slider.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all slider images
exports.getAllImages = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
