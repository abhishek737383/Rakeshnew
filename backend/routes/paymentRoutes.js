const express = require('express');
const {
  uploadPaymentDetails,
  getPayments,
  deletePayment,
} = require('../controllers/paymentController');
const uploadPayment = require('../middleware/uploadPayment'); // Use the original uploadPayment middleware

const router = express.Router();

// Route to submit payment details
router.post('/submit', uploadPayment.single('screenshot'), uploadPaymentDetails); // Using the uploadPayment middleware

// Route to fetch all payments for admin view
router.get('/all', getPayments);

// Route to delete a payment record
router.delete('/:id', deletePayment);

module.exports = router;
