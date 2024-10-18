const Bill = require('../models/Bill');
const cloudinary = require('../config/cloudinaryConfig'); // Add Cloudinary config

// Function to fetch bill details
exports.getBillDetails = async (req, res) => {
  try {
    const billDetails = await Bill.find();
    res.status(200).json(billDetails);
  } catch (error) {
    console.error('Error fetching bill details:', error);
    res.status(500).json({ message: 'Error fetching bill details', error: error.message });
  }
};

// Function to upload bill details
exports.uploadBillDetails = async (req, res) => {
  try {
    const { upiId } = req.body;

    // Check if a file (QR code) is uploaded
    let qrCodeUrl = null;
    if (req.file) {
      // Upload the QR code to Cloudinary using a promise
      const result = await cloudinary.uploader.upload_stream({ folder: 'payment_qrcodes' }).end(req.file.buffer);
      qrCodeUrl = result.secure_url; // Cloudinary URL
    }

    // Update or create bill details with UPI ID and QR code URL
    const bill = await Bill.findOneAndUpdate(
      {},
      { upiId, qrCode: qrCodeUrl },
      { new: true, upsert: true }
    );
    res.status(200).json(bill);
    
  } catch (error) {
    console.error('Error uploading bill details:', error);
    res.status(500).json({ message: 'Error uploading bill details', error: error.message });
  }
};
