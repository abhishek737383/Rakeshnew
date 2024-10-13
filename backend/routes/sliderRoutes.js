const express = require('express');
const { uploadImage, deleteImage, getAllImages } = require('../controllers/sliderController');
const uploadSliderNoLimit = require('../middleware/uploadSliderNoLimit'); // Import the custom upload middleware

const router = express.Router();

// Routes
router.post('/upload', uploadSliderNoLimit.single('sliderImage'), uploadImage); // Upload slider image
router.delete('/:id', deleteImage); // Delete image by ID
router.get('/', getAllImages); // Fetch all slider images

module.exports = router;
