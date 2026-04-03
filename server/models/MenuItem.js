const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['lumpia', 'entree', 'dessert'] },
  emoji: { type: String, default: '🥟' },
  bgColor: { type: String, default: '#d4a574' },
  rating: { type: Number, default: 5 },
  customizable: { type: Boolean, default: false },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
