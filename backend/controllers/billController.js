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
    const qrCode = req.file.path; // Multer saves the file to this path

    const bill = await Bill.findOneAndUpdate({}, { upiId, qrCode }, { new: true, upsert: true });
    res.status(200).json(bill);
  } catch (error) {
    console.error(error); // Added error logging for better debugging
    res.status(500).json({ message: 'Error uploading bill details' });
  }
};
