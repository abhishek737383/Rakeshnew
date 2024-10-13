const Payment = require('../models/Payment');

// Upload payment details (with screenshot)
exports.uploadPaymentDetails = async (req, res) => {
  try {
    // Destructure the relevant fields from req.body
    const { user, transactionId, upiId, qrCode } = req.body; // Ensure these fields are sent in the request
    const screenshot = req.file.filename; // Use the filename to store in the database

    // Create the payment object
    const payment = new Payment({
      user, // User's name
      transactionId,
      upiId,
      qrCode,
      screenshot, // Save only the filename, not the full path
    });

    await payment.save(); // Save the payment details to the database

    res.status(201).json({
      success: true,
      message: 'Payment details uploaded successfully',
      payment,
    });
  } catch (error) {
    console.error('Error uploading payment details:', error.message);
    res.status(500).json({ message: 'Error uploading payment details', error: error.message });
  }
};

// Fetch all payments (for admin view)
exports.getPayments = async (req, res) => {
  try {
    // Fetch payments
    const payments = await Payment.find();

    res.status(200).json(payments); // Return payments directly
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};
// Delete payment details (including screenshot)

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const deletedPayment = await Payment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error.message);
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
};