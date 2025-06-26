const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  type: { type: String, enum: ['particulier', 'professionnel'], default: 'particulier' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);