const express = require('express');
const router = express.Router();
const workCtrl = require('../controllers/WorkController');

router.get('/', workCtrl.getAllWorks);
router.get('/:id', workCtrl.getWorkById);
router.post('/', workCtrl.createWork);
router.put('/:id', workCtrl.updateWork);
router.delete('/:id', workCtrl.deleteWork);

module.exports = router;