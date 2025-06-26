
const Part = require('../models/Part');

// Créer une pièce
exports.createPart = async (req, res) => {
  
  try {
    const part = new Part(req.body);
    await part.save();
    res.status(201).json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir toutes les pièces
exports.getAllParts = async (req, res) => {
  
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// Obtenir une pièce par ID
exports.getPartById = async (req, res) => {
  
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ message: 'Pièce non trouvée' });
    res.json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// Modifier une pièce
exports.updatePart = async (req, res) => {
  
  try {
    const updated = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Pièce non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

};

// Supprimer une pièce
exports.deletePart = async (req, res) => {
  try {
    const deleted = await Part.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Pièce non trouvée' });
    res.json({ message: 'Pièce supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

