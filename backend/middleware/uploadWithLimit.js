const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads/payment directory exists
const paymentUploadsDir = path.join(__dirname, '../uploads/payment');
if (!fs.existsSync(paymentUploadsDir)) {
  fs.mkdirSync(paymentUploadsDir, { recursive: true }); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paymentUploadsDir); // Use the payment uploads directory
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`; // Name file with a timestamp
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept only JPEG and PNG files
  } else {
    cb(new Error('Unsupported file format'), false); // Reject other file formats
  }
};

const uploadWithLimit = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
  fileFilter,
});

module.exports = uploadWithLimit;
