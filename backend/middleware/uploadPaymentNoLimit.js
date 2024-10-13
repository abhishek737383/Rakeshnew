const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define storage configuration for screenshots
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/screenshots');
    
    // Check if the directory exists, if not, create it
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) return cb(err); // Error handling if directory creation fails
      cb(null, uploadDir); // Set the destination to the screenshots directory
    });
  },
  filename: (req, file, cb) => {
    // Use unique timestamp for the filename and preserve the original extension
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Set the unique file name
  }
});

// Configure multer to use the storage settings and set file size limit (5MB)
const uploadPaymentNoLimit = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

module.exports = uploadPaymentNoLimit;
