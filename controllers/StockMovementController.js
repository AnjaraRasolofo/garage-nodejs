
const Part = require('../models/Part');
const StockMovement = require('../models/StockMovement');

module.exports.in = async (req, res) => {

    try {
        const { partId, quantity, note } = req.body;

        const part = await Part.findById(partId);
        if (!part) return res.status(404).send('Pièce non trouvée');

        part.quantity += quantity;

        await StockMovement.create({ part: part._id, type: 'in', quantity, note });

        await part.save();

        res.json({ message: "Entrée de pièces enregistrée", part });
    } 
    catch (err) {
        res.status(500).json({ error: 'Erreur lors de l’entrée de stock.' });
    }

}

module.exports.out = async (req, res) => {

    try {
        const { partId, quantity, note } = req.body;

        const part = await Part.findById(partId);
        if (!part) return res.status(404).send('Pièce non trouvée');

        if (part.quantity - quantity < 0) {
            return res.status(400).json({ error: 'Stock insuffisant.' });
        }

        part.quantity -= quantity;

        await StockMovement.create({ part: part._id, type: 'out', quantity, note });

        await part.save();

        res.json({ message: "Sortie de pièces enregistrée", part });
    } 
    catch (err) {
        res.status(500).json({ error: 'Erreur lors de la sortie de stock.' });
    }
    
}