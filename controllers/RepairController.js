const Repair = require('../models/Repair');
const Vehicle = require('../models/Vehicle');
const Work = require('../models/Work');

exports.createRepair = async (req, res) => {
  try {
    console.log(req.body);
    const { vehicle, works, mechanics, description, startDate, endDate, cost, status } = req.body;
    const foundVehicle = await Vehicle.findById(vehicle);
    if (!foundVehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const foundWorks = await Work.find({ _id: { $in: works } });
    if (foundWorks.length !== works.length) {
      return res.status(400).json({ error: 'One or more works not found' });
    }

    const repair = new Repair({ vehicle, works, description, startDate, endDate, cost, status });
    await repair.save();
    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllRepairs =  async (req, res) => {
  try {
    const repairs = await Repair.find()
      .populate('vehicle')
      .populate('works');
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id)
      .populate('vehicle')
      .populate('works')
      .populate('mechanics');
    if (!repair) return res.status(404).json({ error: 'Repair not found' });
    res.json(repair);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateRepair = async (req, res) => {
  try {
    const updatedRepair = await Repair.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRepair) return res.status(404).json({ error: 'Repair not found' });
    res.json(updatedRepair);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteRepair =  async (req, res) => {
  try {
    const deleted = await Repair.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Repair not found' });
    res.json({ message: 'Repair deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
