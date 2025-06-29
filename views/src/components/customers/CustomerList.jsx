import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Container, Form } from 'react-bootstrap';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  const fetchCustomers = async (page = 1) => {
    try {
      const res = await API.get('/customers/paginated', {
        params: {
            page,
            limit: 10,
            search: searchTerm
        },
      });
      setCustomers(res.data.customers);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Erreur lors du chargement des clients :', err);
    }
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  const totalPages = Math.ceil(total / limit);

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
              <i class="bi bi-search"></i>
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
          {customers.map((cust) => (
            <tr key={cust._id}>
              <td>{cust.lastname} {cust.name}</td>
              <td>{cust.phone}</td>
              <td>{cust.type}</td>
              <td style={{ width: '100px' }}>
                <div className="d-flex justify-content-center">
                  <Link to={`/customers/${cust._id}`} className="btn btn-warning btn-sm me-2">
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCustomer(cust._id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
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

export default CustomerList;
