const cloudinary = require('../config/cloudinaryConfig');
const Slider = require('../models/sliderModel');

const uploadImage = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload image to Cloudinary using the buffer from memory storage
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        // Save the image URL to the database
        const newSlider = new Slider({ imageUrl: result.secure_url });
        await newSlider.save();

        return res.status(201).json({ message: 'Image uploaded successfully', slider: newSlider });
      }
    );

    // Pipe the file buffer to the Cloudinary upload stream
    req.file.buffer.pipe(result);
  } catch (error) {
    console.error('Error uploading slider image:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete slider image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slider image in the database
    const slider = await Slider.findById(id);
    if (!slider) return res.status(404).json({ message: 'Image not found' });

    // Delete the image from Cloudinary using the stored public ID
    await cloudinary.uploader.destroy(slider.publicId);

    // Delete the slider record from the database
    await Slider.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all slider images
exports.getAllImages = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
