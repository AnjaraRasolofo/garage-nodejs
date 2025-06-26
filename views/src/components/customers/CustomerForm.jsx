import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    type: 'particulier',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const loadCustomer = async () => {
    try {
      const res = await API.get(`/customers/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement du client :", error);
    }
  };

  useEffect(() => {
    if (id) loadCustomer();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/customers/${id}`, form);
      } else {
        await API.post('/customers', form);
      }
      navigate('/customers');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Modifier un client" : "Ajouter un client"}</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Adresse</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="particulier">Particulier</option>
            <option value="professionnel">Professionnel</option>
          </select>
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

export default CustomerForm;
