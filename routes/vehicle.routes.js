const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/VehicleController');

router.get('/', vehicleCtrl.getAllVehicles);
router.get('/paginated', vehicleCtrl.getVehiclesPaginated);
router.get('/in-progress', vehicleCtrl.getVehicleInProgress);
router.get('/:id', vehicleCtrl.getVehicleById);
router.post('/', vehicleCtrl.createVehicle);
router.put('/:id', vehicleCtrl.updateVehicle);
router.delete('/:id', vehicleCtrl.deleteVehicle);


module.exports = router;
