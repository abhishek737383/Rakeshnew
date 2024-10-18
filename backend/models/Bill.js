const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    upiId: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    // Additional fields can be added here if needed
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Bill', billSchema);
