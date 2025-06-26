const Work = require('../models/Work');

// GET all works
exports.getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().populate('category', 'name');
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: 'Erreur de récupération des travaux.' });
  }
};

// GET one work
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id).populate('category', 'name');
    if (!work) return res.status(404).json({ error: 'Travail non trouvé.' });
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// POST create work
exports.createWork = async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du travail.' });
  }
};

// PUT update work
exports.updateWork = async (req, res) => {
  try {
    const updated = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Travail non trouvé.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour.' });
  }
};

// DELETE work
exports.deleteWork = async (req, res) => {
  try {
    const deleted = await Work.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Travail non trouvé.' });
    res.json({ message: 'Travail supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
};
