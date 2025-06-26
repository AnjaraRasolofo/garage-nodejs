import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function PartForm() {
  const [form, setForm] = useState({
    nom: '',
    reference: '',
    description: '',
    categorie: '',
    quantite: 0,
    seuil: 5,
    fournisseur: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const loadPart = async () => {
    const res = await API.get(`/parts/${id}`);
    setForm(res.data);
  };

  useEffect(() => {
    if (id) loadPart();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await API.put(`/parts/${id}`, form);
    } else {
      await API.post('/parts', form);
    }
    navigate('/parts');
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Modifier' : 'Ajouter'} une pièce</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nom</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Référence</label>
          <input className="form-control" name="reference" value={form.reference} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Catégorie</label>
          <input className="form-control" name="category" value={form.category} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Quantité</label>
          <input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Seuil</label>
          <input type="number" className="form-control" name="min_quantity" value={form.min_quantity} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Fournisseur</label>
          <input className="form-control" name="provider" value={form.provider} onChange={handleChange} />
        </div>
        <button className="btn btn-success" type="submit">{id ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
    </div>
  );
}

export default PartForm;
