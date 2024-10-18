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

// Upload bill details with QR code
exports.uploadBillDetails = async (req, res) => {
  try {
    const { upiId } = req.body;

    // Check if a file (QR code) is uploaded
    let qrCodeUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream({ folder: 'payment_qrcodes' }, (error, result) => {
        if (error) {
          throw new Error('Error uploading QR code to Cloudinary');
        }
        return result;
      }).end(req.file.buffer);  // Use the file buffer for memory storage
      qrCodeUrl = result.secure_url;  // Cloudinary URL
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
