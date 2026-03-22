const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, default: 'upcoming' },
  createdBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);