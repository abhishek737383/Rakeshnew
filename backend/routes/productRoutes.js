const express = require('express');
const { uploadImage, createProduct, getProducts, getProductById, deleteProduct, updateProduct, } = require('../controllers/productController');
const upload = require('../middleware/uploads');
const router = express.Router();


// Route for uploading images to Cloudinary
router.post('/upload', upload.single('image'), uploadImage);

// Routes for product management
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);




module.exports = router;
