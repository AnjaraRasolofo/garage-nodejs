import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function PartForm() {
  const [form, setForm] = useState({
    name: '',
    reference: '',
    description: '',
    categoryId: '',
    quantity: 0,
    minQuantity: 5,
    provider: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // 🔹 Charger catégories
  const loadCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Charger une pièce
  const loadPart = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/parts/${id}`);
      setForm(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    if (id) loadPart();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: (
        name === 'categoryId' ||
        name === 'quantity' ||
        name === 'minQuantity'
      )
        ? Number(value)
        : value
    });
  };

  // 🔹 Submit
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (id) {
        await API.put(`/parts/${id}`, form);
      } else {
        await API.post('/parts', form);
      }
      navigate('/parts');
    } catch (err) {
      console.error(err);
    }
  };
 console.log(form);
  if (loading) return <p className="text-center mt-4">Chargement...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-end border-bottom pb-2">
          {id ? 'Modifier une pièce' : 'Ajouter une pièce'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Désignation</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Référence</label>
              <input
                className="form-control"
                name="reference"
                value={form.reference}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Catégorie</label>
              <select
                className="form-select"
                name="categoryId"
                value={form.category?.id || ''}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Fournisseur</label>
              <input
                className="form-control"
                name="provider"
                value={form.provider}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Quantité</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Seuil minimum</label>
              <input
                type="number"
                className="form-control"
                name="minQuantity"
                value={form.minQuantity}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="d-flex mt-4">
            <button className="btn btn-primary mx-2">
              {id ? 'Mettre à jour' : 'Ajouter'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/parts')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartForm;