const multer = require('multer');

// Use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept JPEG and PNG files
  } else {
    cb(new Error('Unsupported file format'), false); // Reject other formats
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
