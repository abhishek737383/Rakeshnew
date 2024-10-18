const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Create an instance of multer with the defined storage and file size limits
const uploadPayment = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Export the multer instance to be used in your routes
module.exports = uploadPayment;
