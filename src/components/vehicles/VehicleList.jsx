// VehicleList

import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Container, Form } from 'react-bootstrap';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './Vehicle.css';

const VehicleList = () => {
  
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(11);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchVehicles = async (page = 1) => {

  try {
        const res = await API.get(`/vehicles?page=${page}&limit=${limit}&search=${searchTerm}`);
        setVehicles(res.data.data);
        setPage(res.data.pagination.page);
        setTotal(res.data.pagination.total);
      } catch (err) {
        console.error('Erreur lors du chargement des véhicules :', err);
      }
};
/*
const fetchVehicles = async () => {
  try {
    const res = await API.get(`/vehicles`, {
      params: { search: searchTerm }
    });
    setVehicles(res.data.vehicles || res.data); 
    setTotal(res.data.vehicles?.length || res.data.length);
  } catch (err) {
    console.error('Erreur lors du chargement complet des véhicules :', err);
  }
};*/

  const fetchVehiclesInProgress = async () => {
    const res = await API.get('/vehicles/in-progress');
    setVehicles(res.data);
  };
  
  const deleteVehicle = async (id) => {
    if (window.confirm('Supprimer ce véhicule ?')) {
      try {
        await API.delete(`/vehicles/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
      }
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchVehicles(); // recherche => tout charger
    } else {
      fetchVehicles(page); // pas de recherche => paginer
    }
  }, [searchTerm, page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddVehicle = () => {
    navigate('/vehicles/add');
  };

  const totalPages = Math.ceil(total / limit);
/*
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const filteredVehicles = safeVehicles.filter((v) => {
    const search = searchTerm.toLowerCase().trim();

    const searchable = [
      v.number,
      v.brand,
      v.model,
      v.customer?.lastname,
      v.customer?.firstname
    ]
          .filter(Boolean) // élimine les valeurs nulles ou undefined
          .join(' ')
          .toLowerCase();

        return searchable.includes(search);
    });
*/
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Véhicules enregistrés</h2>
      
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddVehicle}>
            Nouveau véhicule
          </Button>
        </Col>
        <Col>
          <Form className="d-flex align-items-center">
            <Form.Label htmlFor="searchTerm" className="me-2 mb-0">
              <i className="bi bi-search"></i>
            </Form.Label>
            <Form.Control
              id="searchTerm"
              type="text"
              placeholder="Par client, modèle, marque, immatriculation..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Form>
        </Col>
      </Row>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Immatriculation</th>
            <th>Modèle</th>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(vehicles) && vehicles.map((veh) => (
            <tr key={veh.id}>
              <td>{veh.number}</td>
              <td>{veh.brand} {veh.model}</td>
              <td>{veh.customer?.lastname} {veh.customer?.firstname}</td>
              <td style={{ width: '130px' }}>
                <div className="d-flex justify-content-center"></div>
                <Link to={`/repairs/${veh.id}`} className={`btn btn-sm me-2 ${veh.status === 'in_progress' ? 'btn-success' : 'btn-secondary'}`}><i className="bi bi-wrench-adjustable"></i></Link>
                <Link to={`/vehicles/${veh.id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteVehicle(veh.id)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {searchTerm.trim() === '' && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                Précédent
              </button>
            </li>
            {[...Array(totalPages || [])].map((_, index) => (
              <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)} >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}

    </div>
  );
};

export default VehicleList;

