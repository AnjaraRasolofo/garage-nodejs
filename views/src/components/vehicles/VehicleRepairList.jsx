import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useParams } from 'react-router-dom';

const RepairPage = () => {
  const {id} = useParams();
  //const [repairs, setRepairs] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [works, setWorks] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [formData, setFormData] = useState({
    vehicle: '',
    number: '',
    works: [],
    description: '',
    startDate: '',
    endDate: '',
    cost: '',
    status: 'pending'
  });
  /*const [repairs, setRepairs] = useState([
    {
      id: 1,
      vehicle: 'Peugeot 208',
      number: 'AB-123-CD',
      startDate: '2024-06-01',
      endDate: '2024-06-03',
      works: ['Vidange moteur', 'Changement plaquettes'],
      cost: 150,
      status: 'completed',
      description: 'Révision complète'
    }
  ]);*/

  const fetchVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      setVehicle(res.data);
    }
    catch(error) {
      console.error("Erreur lors du chargement des infos du véhicule", error);
    }
  }

  const fetchWorks = async () => {
      try {
        const res = await API.get('/works');
        setWorks(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des travaux :', err);
      }
  };

  const fetchRepair = async () => {
    try {
      const res = await API.get(`/repairs/${id}`);
      setRepairs(res.data);
    }
    catch(error) {
      console.error("Erreur lors du chargement des réparations du véhicule", error);
    }
  }

  
/*
  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions, (opt) => opt.value);
      setForm({ ...form, [name]: values });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
 */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, works: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRepair = {
      ...formData,
      id: repairs.length + 1
    };
    setRepairs([...repairs, newRepair]);
    setFormData({
      vehicle: '',
      number: '',
      works: [],
      description: '',
      startDate: '',
      endDate: '',
      cost: '',
      status: 'pending'
    });
    document.getElementById('closeModalBtn').click();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in_progress': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  useEffect(()=>{
    fetchVehicle()
    fetchWorks()
  },[id])

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{vehicle
          ? `Réparation du ${vehicle.brand} ${vehicle.model} - ${vehicle.number}`
          : 'Chargement des informations du véhicule...'}</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#repairModal">
          ➕ Nouvelle réparation
        </button>
      </div>

      {repairs.map((repair) => (
        <div className="card mb-3" key={repair.id}>
          <div className="card-body">
            <h5 className="card-title"><i class="bi bi-car-front-fill"></i> {repair.vehicle} — {repair.number}</h5>
            <h6 className="card-subtitle text-muted">
              Du {repair.startDate} au {repair.endDate}
            </h6>
            <ul className="mt-2">
              {repair.works.map((work, index) => <li key={index}>{work}</li>)}
            </ul>
            <p className="mb-1"><strong>Coût :</strong> {repair.cost} €</p>
            <span className={`badge bg-${getStatusBadge(repair.status)}`}>
              {repair.status === 'pending' && 'En attente'}
              {repair.status === 'in_progress' && 'En cours'}
              {repair.status === 'completed' && 'Terminé'}
              {repair.status === 'cancelled' && 'Annulé'}
            </span>
            <p className="mt-2 text-muted">{repair.description}</p>
          </div>
        </div>
      ))}

      {/* Modal */}
      <div className="modal fade" id="repairModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Ajouter une réparation</h5>
              <button id="closeModalBtn" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Travaux</label>
                <select multiple name="works" value={formData.works} onChange={handleMultiSelect} className="w-full border p-2 rounded h-32">
                  {works.map(w => (
                    <option key={w._id} value={w._id}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Date début</label>
                <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Date fin</label>
                <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Coût (€)</label>
                <input type="number" className="form-control" name="cost" value={formData.cost} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Statut</label>
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="pending">En attente</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success"><i class="bi bi-floppy2"></i> Enregistrer</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepairPage;
