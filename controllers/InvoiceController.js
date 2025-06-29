const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Repair = require('../models/Repair');
const Vehicle = require('../models/Vehicle');

exports.getInvoices =  async (req, res) => {
  try {
    const { customer, repair, dueDate, status, paymentMethod, notes } = req.body;

    // Vérifie que la réparation existe
    const foundRepair = await Repair.findById(repair).populate('vehicle customer');
    if (!foundRepair) {
      return res.status(404).json({ message: "Réparation introuvable" });
    }

    // Vérifie que le véhicule appartient bien au client
    if (String(foundRepair.customer._id) !== customer) {
      return res.status(400).json({ message: "Le véhicule ne correspond pas au client donné." });
    }

    // Crée la facture avec le montant de la réparation
    const invoice = new Invoice({
      customer,
      repair,
      amount: foundRepair.total,
      dueDate,
      status,
      paymentMethod,
      notes
    });

    await invoice.save();

    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
