const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  price: { type: Number },
  eventId: { type: String },
  status: { type: String, default: 'active' },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);