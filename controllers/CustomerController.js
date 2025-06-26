const Customer = require('../models/Customer');

// GET /api/customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    console.log("all customers charged")
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// GET /api/customers/:id
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Client non trouvé.' });
    console.log("customer charged");
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// POST /api/customers
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    console.log(req.body);
    await customer.save();
    console.log("Customer created");
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création.' });
  }
};

// PUT /api/customers/:id
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Client non trouvé.' });
    console.log("Customer updated");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour.' });
  }
};

// DELETE /api/customers/:id
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Client non trouvé.' });
    console.log("customer removed");
    res.json({ message: 'Client supprimé.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
};
