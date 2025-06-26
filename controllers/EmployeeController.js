const Employee = require('../models/Employee');

// GET all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort('lastName');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du chargement des employés.' });
  }
};

// GET employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employé non trouvé.' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// POST create employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'employé.' });
  }
};

// PUT update employee
exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Employé non trouvé.' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour.' });
  }
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Employé non trouvé.' });
    res.json({ message: 'Employé supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
};
