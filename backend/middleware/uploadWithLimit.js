const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory
const limits = {
  fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
};

const upload = multer({
  storage,
  limits,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
