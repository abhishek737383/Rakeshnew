const multer = require('multer');

// Set up multer for in-memory storage
const storage = multer.memoryStorage();

const uploadSliderNoLimit = multer({ storage });

// No need for a delete function as we're not storing files locally anymore

module.exports = uploadSliderNoLimit;
