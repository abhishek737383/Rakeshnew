const express = require('express');
const {
  uploadPaymentDetails,
  getPayments,
  deletePayment, // Import the delete function from your controller
} = require('../controllers/paymentController');
const uploadPaymentNoLimit = require('../middleware/uploadPaymentNoLimit'); // Use renamed upload

const router = express.Router();

// Route to submit payment details
router.post('/submit', uploadPaymentNoLimit.single('screenshot'), uploadPaymentDetails); // Still uses the same middleware

// Route to fetch all payments for admin view
router.get('/all', getPayments);

// Route to delete a payment record
router.delete('/:id', deletePayment);

module.exports = router;
