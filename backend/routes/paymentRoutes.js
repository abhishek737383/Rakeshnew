const express = require('express');
const {
  uploadPaymentDetails,
  getPayments,
  deletePayment,
  updatePayment,
  getPaymentById,
} = require('../controllers/paymentController');
const uploadPayment = require('../middleware/uploadPayment'); // Use the upload middleware

const router = express.Router();

// Route to submit payment details
router.post('/submit', uploadPayment.single('screenshot'), uploadPaymentDetails); // Using the uploadPayment middleware

// Route to fetch all payments for admin view
router.get('/all', getPayments);

// Route to delete a payment record
router.delete('/:id', deletePayment);

// Route to get a payment by ID
router.get('/:id', getPaymentById);

// Route to update payment details
router.put('/:id', uploadPayment.single('screenshot'), updatePayment); // Using the uploadPayment middleware

module.exports = router;
