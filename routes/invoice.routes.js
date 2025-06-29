const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/InvoiceController');

router.post('/', invoiceController.getInvoices);

module.exports = router;