const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  year: { type: Number },
  color: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);