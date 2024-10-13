const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  user: {
    type: String, // Change to string to store user name
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  upiId: {
    type: String,
    required: true
  },
  screenshot: {
    type: String,
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order', // Optional reference to Order model
  },
  qrCode: String,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
