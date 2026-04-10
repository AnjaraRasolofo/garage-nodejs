import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const repairsPerPage = 10;

  const navigate = useNavigate();

  const fetchRepairs = async () => {
      try {
        const response = await API.get('/repairs');
        setRepairs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur chargement API:', err);
      }
    };

  useEffect(() => {

    fetchRepairs();
  }, []);

  const uniqueVehicles = [...new Map(
    repairs.map(rep => [rep.vehicle._id, rep.vehicle])
  ).values()];

  const filteredRepairs = repairs.filter(repair => {
    return (
      (!selectedVehicle || repair.vehicle._id === selectedVehicle) &&
      (!selectedStatus || repair.status === selectedStatus)
    );
  });

  // code qui gère la pagination
  const indexOfLastRepair = currentPage * repairsPerPage;
  const indexOfFirstRepair = indexOfLastRepair - repairsPerPage;
  const currentRepairs = filteredRepairs.slice(indexOfFirstRepair, indexOfLastRepair);
  const totalPages = Math.ceil(filteredRepairs.length / repairsPerPage);

  if (loading) return <div className="text-center mt-4">Chargement...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Réparations des véhicules</h2>
      <div className='mb-4'>
        <button className="btn btn-primary" onClick={() => navigate('/add-repairs')}>
            Ajouter une réparation
          </button>
      </div>
      {/* Filtres */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Véhicule</label>
          <select
            className="form-select"
            value={selectedVehicle}
            onChange={(e) => {
              setSelectedVehicle(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            {uniqueVehicles.map((v) => (
              <option key={ v._id } value={ v._id }>
                { v.number }  - { v.brand } { v.model }
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">État</label>
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous</option>
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>

        <div className="col-md-4">
          <div></div>
          
        </div>

      </div>

      {/* Tableau */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Véhicule</th>
              <th>Description</th>
              <th>État</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Coût (Ariary)</th>
            </tr>
          </thead>
          <tbody>
            {currentRepairs.map((repair, index) => (
              <tr key={repair._id}>
                <td>{indexOfFirstRepair + index + 1}</td>
                <td>{repair.vehicle.number || repair.vehicle._id}</td>
                <td>{repair.description}</td>
                <td>
                  <span className={`badge ${
                    repair.status === 'pending' ? 'bg-warning text-dark' :
                    repair.status === 'in_progress' ? 'bg-info text-dark' :
                    repair.status === 'completed' ? 'bg-success' :
                    repair.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                  }`}>
                    {repair.status.replace('_', ' ')}
                  </span>
                </td>
                <td>{new Date(repair.startDate).toLocaleDateString()}</td>
                <td>{repair.endDate ? new Date(repair.endDate).toLocaleDateString() : '—'}</td>
                <td>{repair.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Précédent
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}

    </div>
  );
};

export default RepairList;

