
const mongoose = require('mongoose')

const stockMovementSchema = new mongoose.Schema({
    part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    quantity: { type: Number, required: true },
    note: String,
    date: { type: Date, default: Date.now },

    vehiculeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule' },
    mecanicienNom: String,

    commercialNom:String,
    client: String
});

module.exports = mongoose.model('stockMovement', stockMovementSchema);