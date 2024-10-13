const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads/sliders directory exists
const sliderUploadsDir = path.join(__dirname, '../uploads/sliders');
if (!fs.existsSync(sliderUploadsDir)) {
  fs.mkdirSync(sliderUploadsDir, { recursive: true }); // Create directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sliderUploadsDir); // Use the correct directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp
  }
});

const uploadSliderNoLimit = multer({ storage });
// Assuming you have a function to delete a slider by its filename
const deleteSlider = (filename) => {
  const filePath = path.join(__dirname, '../uploads/sliders', filename);

  // Check if the file exists before attempting to delete it
  fs.exists(filePath, (exists) => {
    if (exists) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
          return;
        }
        console.log('File deleted successfully:', filename);
      });
    } else {
      console.log('File not found, skipping deletion:', filename);
    }
  });
};

module.exports = uploadSliderNoLimit;
