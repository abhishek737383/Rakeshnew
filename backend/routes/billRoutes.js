const express = require('express');
const { getBillDetails, uploadBillDetails } = require('../controllers/billController');
const uploadWithLimit = require('../middleware/uploadWithLimit');
const router = express.Router();

router.get('/details', getBillDetails);
router.post('/upload', uploadWithLimit.single('qrCode'), uploadBillDetails);

module.exports = router;
