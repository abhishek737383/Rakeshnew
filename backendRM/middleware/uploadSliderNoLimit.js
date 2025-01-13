const multer = require('multer');

// Use memory storage to handle the file buffer
const storage = multer.memoryStorage();

const uploadSliderNoLimit = multer({ storage });

module.exports = uploadSliderNoLimit;
