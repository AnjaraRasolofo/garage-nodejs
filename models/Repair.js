const mongoose = require('mongoose');

const repairLineSchema = new mongoose.Schema({
  description: String,
  quantity: { type: Number, default: 1 },
  unitPrice: Number
});

const partLineSchema = new mongoose.Schema({
  partName: String,
  quantity: { type: Number, default: 1 },
  unitPrice: Number
});

const repairSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  repairLines: [repairLineSchema],
  partLines: [partLineSchema],
  total: { type: Number, default: 0 },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Auto-calcul du total avant sauvegarde
repairSchema.pre('save', function (next) {
  const repairs = this.repairLines.reduce((sum, r) => sum + r.unitPrice * r.quantity, 0);
  const parts = this.partLines.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);
  this.total = repairs + parts;
  next();
});

module.exports = mongoose.model('Repair', repairSchema);
