import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const VehiculeRepair = () => {
  const { id } = useParams(); // id du véhicule
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null); // si un véhicule est sélectionné depuis les pages précédentes 
  const [vehicles, setVehicles] = useState([]); // sinon on affiche une combobox pour en choisir un nouveau véhicule
  const [works, setWorks] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  const [formData, setFormData] = useState({
    vehicle: id || '',
    works: [],
    mechanics: [],
    description: '',
    startDate: '',
    endDate: '',
    cost: 0,
    status: 'pending'
  });

  useEffect(() => {
    if (id) {
      fetchVehicle();
    } else {
      fetchAllVehicles();
    }
    fetchWorks();
    fetchMechanics();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      setVehicle(res.data);
    } catch (err) {
      console.error('Erreur en chargant l\'info du véhicule :', err);
    }
  };

  const fetchAllVehicles = async () => {
    try {
      const res = await API.get('/vehicles');
      console.log('Résultat /vehicles :', res.data);
      setVehicles(res.data);
    } catch (err) {
      console.error('Erreur chargement des véhicules :', err);
    }
  };

  const fetchWorks = async () => {
    try {
      const res = await API.get('/works');
      setWorks(res.data);
    } catch (err) {
      console.error('Erreur travaux :', err);
    }
  };

  const fetchMechanics = async () => {
    try {
      const res = await API.get('/employees');
      setMechanics(res.data);
    } catch (err) {
      console.error('Erreur mécaniciens :', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [field]: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/repairs', formData);
      alert('Réparation créée avec succès');
      navigate('/repairs');
    } catch (err) {
      console.error('Erreur création réparation :', err);
      alert('Erreur lors de la création');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {id && vehicle
          ? `Nouvelle réparation pour ${vehicle.brand} ${vehicle.model} (${vehicle.number})`
          : 'Nouvelle réparation'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        {/* Choix d'un véhicule si c'est pas encore fait avant */}
        {!id && (
          <div className="mb-3">
            <label className="form-label">Véhicule</label>
            <select
              className="form-select"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner un véhicule --</option>
              {Array.isArray(vehicles) && vehicles.map(v => (
                <option key={v._id} value={v._id}>
                  {v.brand} {v.model} ({v.number})
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Travaux */}
        <div className="mb-3">
          <label className="form-label">Travaux</label>
          <select
            multiple
            className="form-select"
            value={formData.works}
            onChange={(e) => handleMultiSelect(e, 'works')}
          >
            {works.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
          </select>
        </div>

        {/* Mécaniciens */}
        <div className="mb-3">
          <label className="form-label">Mécaniciens</label>
          <select
            multiple
            className="form-select"
            value={formData.mechanics}
            onChange={(e) => handleMultiSelect(e, 'mechanics')}
          >
            {mechanics.map(m => (
              <option key={m._id} value={m._id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Date de début</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Date de fin</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Coût */}
        <div className="mb-3">
          <label className="form-label">Coût (Ariary)</label>
          <input
            type="number"
            className="form-control"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>

        {/* Statut */}
        <div className="mb-4">
          <label className="form-label">Statut</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Enregistrer la réparation</button>
      </form>
    </div>
  );
};

export default VehiculeRepair;
