const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage
const uploadSliderNoLimit = multer({ storage });

module.exports = uploadSliderNoLimit;
