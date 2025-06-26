// VehiculeRepair.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const VehiculeRepair = () => {
  const { id } = useParams(); // id du véhicule
  const [vehicle, setVehicle] = useState(null);
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    vehicle: id || '', 
    works: [],
    description: '',
    startDate: '',
    endDate: '',
    cost: 0,
    status: 'pending'
  });

  const fetchVehicle = async () => {
      try {
        const res = await API.get(`/vehicles/${id}`);
        setVehicle(res.data); 
      } catch (err) {
        console.error('Erreur lors du chargement de l\'info du véhicule :', err);
      }
    };

  const fetchWorks = async () => {
    try {
      const res = await API.get('/works');
      setWorks(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des travaux :', err);
    }
  };

  useEffect(() => {
    fetchVehicle();
    fetchWorks();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, works: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/repairs', formData);
      alert('Réparation créée avec succès');
      setFormData({
        vehicle: id,
        works: [],
        description: '',
        startDate: '',
        endDate: '',
        cost: 0,
        status: 'pending'
      });
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">
        {vehicle
          ? `Réparation de la voiture ${vehicle.brand} ${vehicle.model} ${vehicle.number}`
          : 'Chargement des informations du véhicule...'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Travaux</label>
          <select multiple name="works" value={formData.works} onChange={handleMultiSelect} className="w-full border p-2 rounded h-32">
            {works.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date de début</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1">Date de fin</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block mb-1">Coût (Ariary)</label>
          <input type="number" name="cost" value={formData.cost} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block mb-1">Statut</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
      </form>
    </div>
  );
};

export default VehiculeRepair;
