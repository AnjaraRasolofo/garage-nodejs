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
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const res = await API.get(`/vehicles?search=${searchTerm}&page=${page}`);
      setVehicles(res.data.vehicles);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Erreur lors du chargement des véhicules :', err);
    }
  };

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
    fetchVehicles(page);
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  const totalPages = Math.ceil(total / limit);

  const filteredVehicles = vehicles.filter(v => {
    const client = `${v.customer?.lastname || ''} ${v.customer?.name || ''}`.toLowerCase();
    const model = `${v.brand || ''} ${v.model || ''}`.toLowerCase();
    const number = `${v.number || ''}`.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
        client.includes(search) ||
        model.includes(search) ||
        number.includes(search)
    );
  });

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
              <i class="bi bi-search"></i>
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
            <th>Client</th>
            <th>Modèle</th>
            <th>Immatriculation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((veh) => (
            <tr key={veh._id}>
              <td>{veh.customer?.lastname} {veh.customer?.name}</td>
              <td>{veh.brand} {veh.model}</td>
              <td>{veh.number}</td>
              <td style={{ width: '130px' }}>
                <div className="d-flex justify-content-center"></div>
                <Link to={`/repairs/${veh._id}`} className={`btn btn-sm me-2 ${veh.status === 'in_progress' ? 'btn-success' : 'btn-secondary'}`}><i className="bi bi-wrench-adjustable"></i></Link>
                <Link to={`/vehicles/${veh._id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteVehicle(veh._id)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Précédent
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
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

    </div>
  );
};

export default VehicleList;

