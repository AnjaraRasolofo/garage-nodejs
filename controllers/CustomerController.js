const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const Repair = require('../models/Repair');
const Invoice = require('../models/Invoice');

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

// GET /api/customers/paginated
exports.getCustomersPaginated = async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 10;   
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { lastname: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ]
    };

    const customers = await Customer.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Customer.countDocuments(query);
    //console.log(customers);
    res.json({
      customers: customers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  }
  catch(err) {
    console.error('Erreur récuperation de clients par page', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}

// GET /api/custoers/summary
exports.getCustomerSummaries = async (req, res) => {
  console.log('test');
  try {
    const customers = await Customer.find();

    const summaries = await Promise.all(customers.map(async (client) => {
      const vehicles = await Vehicle.find({ client: client._id });
      const vehicleIds = vehicles.map(v => v._id);

      const repairsInProgress = await Repair.countDocuments({
        vehicle: { $in: vehicleIds },
        status: 'in_progress'
      });

      const unpaidInvoices = await Invoice.countDocuments({
        customer: client._id,
        status: { $ne: 'paid' }
      });

      return {
        _id: client._id,
        name: client.lastname,
        email: client.email,
        phone: client.phone,
        vehiclesCount: vehicles.length,
        repairsInProgress,
        unpaidInvoices
      };
    }));
    res.json(summaries);
  } catch (err) {
    console.error('Erreur résumé clients :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getCustomerVehicles = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Client non trouvé' });
    const vehicles = await Vehicle.find({customer : customer._id});

    res.json({ customer, vehicles });
  }
  catch(error) {
    console.error("Erreur lors du chargement des véhicules par client", error);
    res.status(500).json({essage: "Ereur srveur"});
  }
}

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
    console.log(req.body);
    const customer = new Customer(req.body);
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
