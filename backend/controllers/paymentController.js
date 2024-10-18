const cloudinary = require('../config/cloudinaryConfig');
const Payment = require('../models/Payment');
const streamifier = require('streamifier'); // Import streamifier

// Upload payment details (with screenshot to Cloudinary)
exports.uploadPaymentDetails = async (req, res) => {
  console.log('Request received:', req.body); // Log request body
  console.log('File uploaded:', req.file); // Log uploaded file

  try {
    const { user, transactionId, upiId } = req.body; // Destructure fields from req.body

    // Check if screenshot is present
    if (!req.file) {
      return res.status(400).json({ message: 'Payment screenshot is required.' });
    }

    // Create a stream from the buffer and upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(async (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error.message);
        return res.status(500).json({ message: 'Error uploading screenshot', error: error.message });
      }

      // Create the payment object
      const payment = new Payment({
        user, // User's name
        transactionId,
        upiId,
        screenshot: result.secure_url, // Save the Cloudinary URL in the database
      });

      await payment.save(); // Save the payment details to the database

      res.status(201).json({
        success: true,
        message: 'Payment details uploaded successfully',
        payment,
      });
    });

    // Pipe the buffer to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error('Error uploading payment details:', error.message);
    res.status(500).json({ message: 'Error uploading payment details', error: error.message });
  }
};

// Update payment details
exports.updatePayment = async (req, res) => {
  try {
    const { user, transactionId, upiId } = req.body; // Fields to update
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update fields
    payment.user = user;
    payment.transactionId = transactionId;
    payment.upiId = upiId;

    if (req.file) {
      // If there's a new screenshot, upload it to Cloudinary
      const stream = cloudinary.uploader.upload_stream(async (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error.message);
          return res.status(500).json({ message: 'Error uploading new screenshot', error: error.message });
        }

        // Update the screenshot URL
        payment.screenshot = result.secure_url; // Update the Cloudinary URL

        const updatedPayment = await payment.save();
        res.json({
          success: true,
          message: 'Payment updated successfully',
          payment: updatedPayment,
        });
      });

      // Pipe the new buffer to Cloudinary
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    } else {
      const updatedPayment = await payment.save();
      res.json({
        success: true,
        message: 'Payment updated successfully',
        payment: updatedPayment,
      });
    }
  } catch (error) {
    console.error('Error updating payment:', error.message);
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

// Fetch all payments (for admin view)
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments); // Return payments directly
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};

// Delete payment details (including screenshot)
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

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error.message);
    res.status(500).json({ message: 'Error fetching payment', error: error.message });
  }
};
