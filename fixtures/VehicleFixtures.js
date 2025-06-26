
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

async function getVehicle() {

  const customers = await Customer.find(); 

  if (customers.length === 0) {
    console.error('Aucun client trouvée. Veuillez d’abord insérer les clients.');
    return;
  }

  const vehicles = [
    { customer: customers[5]._id, brand: 'Renault', model: 'Duster', number: '8547 WWT', year: 2023, color: 'Gris' },
    { customer: customers[1]._id, brand: 'BMW', model: 'X5', number: '5642 TBN', year: 2023, color: 'Rouge' },
    { customer: customers[4]._id, brand: 'Peugeot', model: 'Landtrack', number: 'BX-047-KH', year: 2024, color: 'Gris' },
    { customer: customers[6]._id, brand: 'Toyota', model: 'Land cruiser HZJ76L', number: '207 CD 204', year: 2012, color: 'Blanche' },
    { customer: customers[7]._id, brand: 'Peugeot', model: '3008', number: 'YJ-792-VL', year: 2018, color: 'Noir' },
    { customer: customers[4]._id, brand: 'Mercedes', model: 'GL 500', number: '4578TCA', year: 2023, color: 'Blanc' },
    { customer: customers[2]._id, brand: 'Mercedes', model: 'Sprinter 316 CDI', number: '1452 TAN', year: 2010, color: 'Vert' },
    { customer: customers[5]._id, brand: 'Mercedes', model: 'ML 320', number: '5621 TAP', year: 2005, color: 'Bleu' },
    { customer: customers[4]._id, brand: 'Volkswagen', model: 'Tiguan', number: '6358 TBP', year: 2022, color: 'Blanc' },
    { customer: customers[0]._id, brand: 'Peugeot', model: '308', number: '3545 TBA', year: 2015, color: 'Blanc' }, // à ignorer si client_id = 0
    { customer: customers[3]._id, brand: 'Mercedes', model: 'C220', number: '6363 TBG', year: 2020, color: 'Jaune' },
    { customer: customers[2]._id, brand: 'Ford', model: 'Ranger', number: '8945 TBB', year: 2017, color: 'Vert' },
    { customer: customers[5]._id, brand: 'Mercedes', model: 'Sprinter', number: '4512 TAP', year: 2021, color: 'Noir' },
    { customer: customers[3]._id, brand: 'Renault', model: 'MEGANE', number: 'ER-819-OG', year: 2020, color: 'Blanc' },
    { customer: customers[9]._id, brand: 'Renault', model: 'Laguna2', number: '6541 TCA', year: 2021, color: 'Bleu' },
    { customer: customers[5]._id, brand: 'Renault', model: 'Logan', number: '9595 TBP', year: 2011, color: 'Gris' },
    { customer: customers[6]._id, brand: 'Toyota', model: 'Land cruiser Prado', number: '0785 TAS', year: 2014, color: 'Blanche' },
    { customer: customers[8]._id, brand: 'Renault', model: 'Master', number: 'XN-847-GL', year: 2024, color: 'Rouge' },
    { customer: customers[7]._id, brand: 'BMW', model: 'X3', number: '5241 TBE', year: 2022, color: 'Jaune' },
    { customer: customers[4]._id, brand: 'Mercedes', model: 'Sprinter 312', number: '9856 TBB', year: 2013, color: 'Jaune' },
    { customer: customers[1]._id, brand: 'Volkswagen', model: 'Crafter', number: 'ZU-621-MV', year: 2000, color: 'Rouge' },
    { customer: customers[3]._id, brand: 'MAZDA', model: 'BT 50', number: '2578 WWT', year: 2006, color: 'Rouge' },
    { customer: customers[8]._id, brand: 'Citroën', model: 'Jumper', number: 'OZ-566-ZK', year: 2017, color: 'Bleu' },
    { customer: customers[2]._id, brand: 'Volkswagen', model: 'Passat', number: 'ZR-499-VY', year: 2005, color: 'Blanc' },
    { customer: customers[6]._id, brand: 'Toyota', model: 'Fortuner', number: '7474 WWT', year: 2023, color: 'Blanc' },
    { customer: customers[6]._id, brand: 'Citroën', model: 'C5', number: '5894 TBB', year: 2018, color: 'Bleu' },
  ];

  return vehicles;

}

module.exports = getVehicle;
