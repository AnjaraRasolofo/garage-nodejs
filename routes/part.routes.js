
const express = require('express');
const router = express.Router();
const partController = require('../controllers/PartController');
const stockMovementController = require('../controllers/StockMovementController');

router.post('/', partController.createPart);
router.get('/', partController.getAllParts);
router.get('/:id', partController.getPartById);
router.put('/:id', partController.updatePart);
router.delete('/:id', partController.deletePart);

router.post('/in', stockMovementController.in);
router.post('/out', stockMovementController.out);

module.exports = router;