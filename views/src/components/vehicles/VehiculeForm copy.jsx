import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const VehicleForm = () => {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    number: '',
    year: '',
    color: '',
    customer: '',
  });

  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const loadVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      setForm({
        brand: res.data.brand,
        model: res.data.model,
        number: res.data.number,
        year: res.data.year || '',
        color: res.data.color || '',
        customer: res.data.customer?._id || res.data.customer, // au cas où
      });
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule :", error);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await API.get('/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
    }
  };

  useEffect(() => {
    loadCustomers();
    if (id) loadVehicle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/vehicles/${id}`, form);
      } else {
        await API.post('/vehicles', form);
      }
      navigate('/vehicles');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Modifier un véhicule" : "Ajouter un véhicule"}</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Client</label>
          <select
            className="form-select"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un client --</option>
            {customers.map(cust => (
              <option key={cust._id} value={cust._id}>
                {cust.lastname} {cust.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Marque</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Modèle</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Immatriculation</label>
          <input
            type="text"
            className="form-control"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Année</label>
          <input
            type="number"
            className="form-control"
            name="year"
            value={form.year}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Couleur</label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={form.color}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {id ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
