const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  orderType: { type: String, required: true, enum: ['pickup', 'delivery', 'catering'] },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed'] },
  address: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
