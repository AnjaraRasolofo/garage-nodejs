import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PartList from './components/parts/PartList';
import PartForm from './components/parts/PartForm';
import Navbar from './components/Navbar';
import EntryForm from './components/parts/StockMovementForm';
import EmployeesList from './components/employees/EmployeeList';
import EmployeesForm from './components/employees/EmployeeForm';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import VehicleList from './components/vehicles/VehicleList';
import VehicleForm from './components/vehicles/VehiculeForm';
import VehicleRepairForm from './components/vehicles/VehicleRepairForm';
import VehicleRepairList from './components/vehicles/VehicleRepairList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/parts" element={<PartList />} />
        <Route path="/add-part" element={<PartForm />} />
        <Route path="/parts/:id" element={<PartForm />} />
        <Route path="/stock-in" element={<EntryForm />} />

        <Route path="/customers" element={<CustomerList/>}/>
        <Route path="/add-customer" element={<CustomerForm/>}/>
        <Route path="/customers/:id" element={<CustomerForm/>}/>

        <Route path="/vehicles" element={<VehicleList/>}/>
        <Route path="/add-vehicle" element={<VehicleForm/>}/>
        <Route path="/vehicles/:id" element={<VehicleForm/>}/>
        <Route path="/add-repairs/:id" element={<VehicleRepairForm />}/>
        <Route path="/repairs/:id" element={<VehicleRepairList />}/>


        <Route path="/employees" element={<EmployeesList/>}/>
        <Route path="/add-employe" element={<EmployeesForm/>}/>
        <Route path="/employees/:id" element={<EmployeesList/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

