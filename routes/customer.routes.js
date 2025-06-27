const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/CustomerController');

router.get('/', customerCtrl.getAllCustomers);
router.get('/summary', customerCtrl.getCustomerSummaries);
router.get('/:id', customerCtrl.getCustomerById);
router.post('/', customerCtrl.createCustomer);
router.put('/:id', customerCtrl.updateCustomer);
router.delete('/:id', customerCtrl.deleteCustomer);


module.exports = router;
