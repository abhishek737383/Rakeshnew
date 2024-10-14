// controllers/billController.js
const Bill = require('../models/Bill');

// Function to fetch bill details
exports.getBillDetails = async (req, res) => {
    try {
        const billDetails = await Bill.find(); // Fetch bill details from your model
        res.status(200).json(billDetails);
    } catch (error) {
        console.error('Error fetching bill details:', error);
        res.status(500).json({ message: 'Error fetching bill details', error: error.message });
    }
};

exports.uploadBillDetails = async (req, res) => {
  try {
    const { upiId } = req.body;
    const qrCode = req.file ? `/uploads/payment/${req.file.filename}` : null; // Use relative path

    // Update or create bill details with UPI ID and QR code
    const bill = await Bill.findOneAndUpdate(
      {}, // Assuming you're updating the first or only record
      { upiId, qrCode },
      { new: true, upsert: true } // `upsert: true` will create a new record if none exists
    );

    res.status(200).json(bill); // Return the updated or created bill document
  } catch (error) {
    console.error('Error uploading bill details:', error);
    res.status(500).json({ message: 'Error uploading bill details', error: error.message });
  }
};
