const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reference: { type: String, required: true },
    description: String,
    quantity: { type: Number, default: 0 },
    minQuantity: { type: Number, default: 0 },
    provider: {type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Part', partSchema);