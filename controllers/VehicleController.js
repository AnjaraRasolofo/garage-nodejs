
const Vehicle = require('../models/Vehicle');
const Customer = require('../models/Customer');
const Repair = require('../models/Repair');

// GET /api/vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('customer');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// GET /api/vehicles/:id
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('customer');
    if (!vehicle) return res.status(404).json({ error: 'Véhicule non trouvé.' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// GET /api/vehicles/paginated
exports.getVehiclesPaginated = async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 10;   
    const skip = (page - 1) * limit;

    const matchingCustomers = await Customer.find({
      $or: [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } }
      ]
    }).select('_id');

    const customerIds = matchingCustomers.map(c => c._id);

    const query = {
      $or: [
        { number: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { customer: { $in: customerIds } }
      ]
    };

    const vehicles = await Vehicle.find(query)
        .populate('customer')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); 
    
    const total = await Vehicle.countDocuments(query);

    res.json({
      vehicles: vehicles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  }
  catch(err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
}

// GET /api/vehicles/in-progress
exports.getVehicleInProgress = async (req, res) => {
  try {
    // Trouver les réparations en cours
    const repairsInProgress = await Repair.find({ status: 'in_progress' })
      .populate('vehicle')
      .populate('vehicle.customer');

    // Extraire les véhicules uniques
    const vehicles = [];
    const seen = new Set();

    for (const rep of repairsInProgress) {
      const vId = rep.vehicle._id.toString();
      if (!seen.has(vId)) {
        seen.add(vId);
        vehicles.push(rep.vehicle);
      }
    }

    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/vehicles
exports.createVehicle = async (req, res) => {
  try {
    const { customerId, brand, model, number, year, color } = req.body;
    console.log(req.body);
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) return res.status(400).json({ error: 'Client invalide.' });
    
    const vehicle = new Vehicle({ customer: customerId, brand, model, number, year, color });
    await vehicle.save();
    console.log("Vehicle created");
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création.' });
  }
};

// PUT /api/vehicles/:id
exports.updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Véhicule non trouvé.' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour.' });
  }
};

// DELETE /api/vehicles/:id
exports.deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Véhicule non trouvé.' });
    res.json({ message: 'Véhicule supprimé.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
