const express = require('express');
const { uploadImage, deleteImage, getAllImages } = require('../controllers/sliderController');
const uploadSliderNoLimit = require('../middleware/uploadSliderNoLimit');

const router = express.Router();

// Routes
router.post('/uploads', uploadSliderNoLimit.single('sliderImage'), uploadImage);
router.delete('/:id', deleteImage);
router.get('/', getAllImages);

module.exports = router;
