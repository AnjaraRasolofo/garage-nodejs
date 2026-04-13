import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    function: '',
    hiringDate: '',
    salary: '',
    status: ''
  });

  const navigate = useNavigate();
    const { id } = useParams();

   const loadEmployee = async () => {
      const res = await API.get(`/employees/${id}`);
      setForm(res.data);
    };

    useEffect(() => {
        if (id) loadEmployee();
      }, [id]);

    const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await API.put(`/employees/${id}`, form);
    } else {
      await API.post('/employees', form);
    }
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
      <h2 className="mb-4 text-end border-bottom pb-2">
          {id ? 'Modifier un employé' : 'Ajouter un nouvel employé'}
      </h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Prénom</label>
          <input type="text" className="form-control" name="firstname" value={form.firstname} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" name="lastname" value={form.lastname} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Téléphone</label>
          <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Adresse</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Poste</label>
          <input type="text" className="form-control" name="function" value={form.function} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Date embauche</label>
          <input type="date" className="form-control" name="hiringDate" value={form.hiringDate} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Salaire (Ar)</label>
          <input type="number" className="form-control" name="salary" value={form.salary} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Ajouter</button>
        <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => navigate('/employees')}
            >
              Annuler
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EmployeForm;
