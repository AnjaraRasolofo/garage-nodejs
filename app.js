// garage-nodejs -> app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const partRoutes = require('./routes/part.routes');
const customerRoutes = require('./routes/customer.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const categoryRoutes = require('./routes/category.routes');
const employeeRoutes = require('./routes/employee.routes');
const workRoutes = require('./routes/work.routes');
const repairRoutes = require('./routes/repair.routes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true}));
  
app.use(express.json());

app.use('/api/parts', partRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/works', workRoutes);
app.use('/api/repairs', repairRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
