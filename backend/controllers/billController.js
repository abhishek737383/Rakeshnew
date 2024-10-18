const Bill = require('../models/Bill');
const cloudinary = require('../config/cloudinaryConfig'); // Cloudinary config
const { PassThrough } = require('stream');

exports.getBillDetails = async (req, res) => {
  try {
    const billDetails = await Bill.find();
    res.status(200).json(billDetails);
  } catch (error) {
    console.error('Error fetching bill details:', error);
    res.status(500).json({ message: 'Error fetching bill details', error: error.message });
  }
};

exports.uploadBillDetails = async (req, res) => {
  try {
    const { upiId } = req.body;

    // Check if a file (QR code) is uploaded
    let qrCodeUrl = null;
    if (req.file) {
      const stream = new PassThrough();
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'payment_qrcodes' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ message: 'Error uploading QR code', error: error.message });
          }
          qrCodeUrl = result.secure_url;  // Cloudinary URL
          // Update or create bill details with UPI ID and QR code URL
          updateBillDetails(upiId, qrCodeUrl, res);
        }
      );
      stream.pipe(uploadStream);
      stream.end(req.file.buffer); // Pipe the file buffer into the stream
    } else {
      // No file uploaded, just update UPI ID
      const bill = await Bill.findOneAndUpdate(
        {},
        { upiId },
        { new: true, upsert: true }
      );
      return res.status(200).json(bill);
    }
  } catch (error) {
    console.error('Error uploading bill details:', error);
    res.status(500).json({ message: 'Error uploading bill details', error: error.message });
  }
};

const updateBillDetails = async (upiId, qrCodeUrl, res) => {
  try {
    // Update or create bill details with UPI ID and QR code URL
    const bill = await Bill.findOneAndUpdate(
      {},
      { upiId, qrCode: qrCodeUrl },
      { new: true, upsert: true }
    );
    res.status(200).json(bill);
  } catch (error) {
    console.error('Error updating bill details:', error);
    res.status(500).json({ message: 'Error updating bill details', error: error.message });
  }
};
