import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Container, Form, Modal } from 'react-bootstrap';
import API from '../../services/api';
import CustomerVehicles from './CustomerVehicles';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(11);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  const fetchCustomers = async (page = 1) => {
    try {
      const res = await API.get(`/customers?page=${page}&limit=${limit}&search=${searchTerm}`);
      setCustomers(res.data.data);
      setPage(res.data.pagination.page);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error('Erreur lors du chargement des clients :', err);
    }
  };

  const loadVehicles = async (customerId) => {
    try {
      const res = await API.get(`/vehicles/customer/${customerId}`);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    loadVehicles(customer.id);
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Supprimer ce client ?')) {
      try {
        await API.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
      }
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddCustomer = () => {
    navigate('/customers/add');
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page, limit, searchTerm]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Clients enregistrés</h2>
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddCustomer}>
            Nouveau client
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
              placeholder="Rechercher par nom ou type..."
              value={searchTerm}
              onChange={(e) => {
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
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.lastname} {cust.firstname}</td>
              <td>{cust.phone}</td>
              <td>{cust.type}</td>
              <td style={{ width: '160px' }}>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => {
                      openModal(cust)
                    }}
                  >
                    <i className="bi bi-car-front"></i>
                  </button>
                  <Link to={`/customers/${cust.id}`} className="btn btn-warning btn-sm me-2">
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCustomer(cust.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">

  {/* HEADER */}
    <Modal.Header closeButton>
      <Modal.Title>
        Véhicules du client : {selectedCustomer?.firstname} {selectedCustomer?.lastname}
      </Modal.Title>
    </Modal.Header>

    {/* BODY */}
    <Modal.Body>

      {/* MINI DASHBOARD */}
      <div className="row mb-3 align-items-stretch">

        <div className="col-md-4 d-flex">
          <div className="card p-3 text-center w-100">
            <h6>Véhicules</h6>
            <h3>{vehicles.length}</h3>
          </div>
        </div>

        <div className="col-md-8 d-flex">
          <div className="card p-3 w-100 d-flex flex-column justify-content-center">
            <p className="mb-0">
              <strong>Téléphone :</strong> {selectedCustomer?.phone}
            </p>
            <p className="mb-1">
              <strong>Email :</strong> {selectedCustomer?.email}
            </p>
          </div>
        </div>

      </div>

      {/* ACTION BUTTON */}
      <div className="mb-3 text-start">
        <button className="btn btn-success"
          type="button"
          onClick={() => navigate('/vehicles/add')}
          >
          ➕ Ajouter véhicule
        </button>
      </div>

      {/* TABLE VEHICLES */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Immatriculation</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.brand}</td>
              <td>{v.model}</td>
              <td>{v.number}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Modal.Body>

    {/* FOOTER */}
    <Modal.Footer>
      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
        Fermer
      </button>
    </Modal.Footer>

  </Modal>
      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Précédent
            </button>
          </li>
          {[...Array(totalPages || 0)].map((_, index) => (
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

export default CustomerList;
