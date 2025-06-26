const mongoose = require('mongoose');
const Category = require('../models/Category');
const Work = require('../models/Work');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const Part = require('../models/Part');

const categories = require('./CategoryFixtures');
const customers = require('./CustomerFixtures');
const employees = require('./EmployeeFixtures');
const getParts = require('./PartFixtures');
const getWorks = require('./WorkFixtures');
const getVehicle = require('./VehicleFixtures');

mongoose.connect('mongodb://localhost:27017/garagedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  
  console.log('✅ Connecté à MongoDB');

  mongoose.connection.dropDatabase(); // Réinitialise les collections

  try {
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('✅ Catégories insérés avec succès.');
  }
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des catégories :', error);
  }

  try{
    const works = await getWorks();
    await Work.deleteMany();
    await Work.insertMany(works);
    console.log('✅ Travaux insérés avec succès.');
  }
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des travaux de réparation :', error);
  }

  try{
    await Employee.deleteMany();
    await Employee.insertMany(employees);
    console.log('✅ Employés insérés avec succès.');
  }
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des employés :', error);
  }
  
  try {
    await Customer.deleteMany();
    await Customer.insertMany(customers);
    console.log('✅ Clients insérés avec succès.');
  }
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des clients :', error);
  }

  try {
    const vehicles = await getVehicle();
    await Vehicle.deleteMany();
    await Vehicle.insertMany(vehicles);
    console.log('✅ Véhicules insérés avec succès.');
  } 
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des véhicules :', error);
  }

  try {
    const parts = await getParts();
    await Part.deleteMany();
    await Part.insertMany(parts);
    console.log('✅ Pièces insérés avec succès.');
  } 
  catch (error) {
    console.error('❌ Erreur lors de l’insertion des pièces :', error);
  }

  console.log('Données initiales insérées avec succès');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Erreur de connexion :', err);
});
