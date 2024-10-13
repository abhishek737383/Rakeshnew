const express = require('express');
const { getBillDetails, uploadBillDetails } = require('../controllers/billController'); // Make sure this is correct
const uploadWithLimit = require('../middleware/uploadWithLimit');
const router = express.Router();

// Ensure this route exists
router.get('/details', getBillDetails); // Add this if it's not present
router.post('/upload', uploadWithLimit.single('qrCode'), uploadBillDetails);

module.exports = router;
