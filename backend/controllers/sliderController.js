const cloudinary = require('../config/cloudinaryConfig');
const Slider = require('../models/sliderModel');
const path = require('path'); // Ensure the path module is imported
// Upload image to Cloudinary and save to the database
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload image to Cloudinary from buffer (since you are using memory storage)
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        const newSlider = new Slider({
          imageUrl: result.secure_url,
          publicId: result.public_id,  // Save publicId for deletion
        });

        newSlider.save()
          .then(() => res.status(201).json({ message: 'Image uploaded successfully', slider: newSlider }))
          .catch((err) => res.status(500).json({ message: 'Database save failed', error: err.message }));
      }
    );

    // This is the trick to convert multer buffer into a readable stream for Cloudinary
    const bufferStream = require('stream').Readable.from(req.file.buffer);
    bufferStream.pipe(result);  // Pipe the buffer to Cloudinary's upload stream

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete image from Cloudinary or local filesystem and the database
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slider image in the database
    const slider = await Slider.findById(id);
    if (!slider) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (slider.publicId) {
      // If the image has a publicId, it's a Cloudinary image, delete it from Cloudinary
      await cloudinary.uploader.destroy(slider.publicId);
    } else {
      // If no publicId, it may be a local file, so try deleting from the local filesystem
      const localFilePath = path.join(__dirname, '..', 'uploads', slider.imageUrl); // Correct the path to the local file

      // Check if the file exists locally before attempting to delete
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath); // Delete the local file
        console.log(`Local file ${localFilePath} deleted successfully`);
      } else {
        console.log(`Local file ${localFilePath} not found`);
      }
    }

    // Delete the record from the database
    await Slider.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error); // Log the exact error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Fetch all slider images from the database
exports.getAllImages = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
