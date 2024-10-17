const express = require('express');
const { uploadImage, deleteImage, getAllImages } = require('../controllers/sliderController');
const uploadSliderNoLimit = require('../middleware/uploadSliderNoLimit');

const router = express.Router();

// Routes
router.post('/upload', uploadSliderNoLimit.single('sliderImage'), uploadImage); // Route to upload a slider image
router.delete('/:id', deleteImage); // Route to delete a slider image by ID
router.get('/', getAllImages); // Route to fetch all slider images

module.exports = router;
