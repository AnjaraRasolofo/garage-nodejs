import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import RepairForm from './components/repairs/RepairForm';
import RepairList from './components/repairs/RepairList';
import CustomerVehicles from './components/customers/CustomerVehicles';
import StockList from './components/parts/StockList';
import Login from "./components/Login";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parts" element={<PartList />} />
        <Route path="/parts/add" element={<PartForm />} />
        <Route path="/parts/:id" element={<PartForm />} />
        <Route path="/stock/in-out" element={<EntryForm />} />
        <Route path="/stock" element={<StockList />} />

        <Route path="/customers" element={<CustomerList/>}/>
        <Route path="/customers/add" element={<CustomerForm/>}/>
        <Route path="/customers/:id" element={<CustomerForm/>}/>
        <Route path="/customers/:id/vehicles" element={<CustomerVehicles />}/>
        <Route path="/vehicles/add" element={<VehicleForm/>}/>
        <Route path="/vehicles" element={<VehicleList/>}/>
        
        <Route path="/vehicles/:id" element={<VehicleForm/>}/>

        <Route path="/repairs" element={<RepairList />}/>
        <Route path="/repairs/add" element={<RepairForm />}/>
        <Route path="/repairs/:id" element={<RepairForm />}/>

        <Route path="/employees" element={<EmployeesList/>}/>
        <Route path="/employees/add" element={<EmployeesForm/>}/>
        <Route path="/employees/:id" element={<EmployeesForm/>}/>

      </Routes>
      <footer className="footer bg-light text-center py-3 mt-5">
        &copy; 2023 - <a href="https://301-webagency.xyz" className="text-decoration-none text-reset">301 Web Agency </a>
      </footer>
    </BrowserRouter>
  );
}

export default App;

