// models/Bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  upiId: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bill', billSchema);
