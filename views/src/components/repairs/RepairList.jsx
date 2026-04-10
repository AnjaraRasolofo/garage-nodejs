import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

function ReparationList() {
  const [reparations, setReparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchReparations = async (page = 1) => {
    try {
      setLoading(true);
      const res = await API.get(
        `/repairs?page=${page}&limit=${limit}&search=${searchTerm}`
      );

      setReparations(res.data.data);
      setPage(res.data.pagination.page);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error('Erreur lors du chargement des réparations :', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReparation = async (id) => {
    if (window.confirm('Supprimer cette réparation ?')) {
      await API.delete(`/repairs/${id}`);
      fetchReparations(page);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchReparations(page);
  }, [page, limit, searchTerm]);

  return (
    <div className="container mt-4">
      <h2>Liste des réparations</h2>

      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Link to="/repairs/add" className="btn btn-primary mb-3">
            Ajouter une réparation
          </Link>
        </Col>

        <Col>
          <Form className="d-flex align-items-center">
            <Form.Label htmlFor="searchTerm" className="me-2 mb-0">
              <i className="bi bi-search"></i>
            </Form.Label>
            <Form.Control
              id="searchTerm"
              type="text"
              placeholder="Rechercher client, véhicule ou statut..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Form>
        </Col>
      </Row>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Véhicule</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reparations.map((r) => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.customer?.name || '-'}</td>
              <td>{r.vehicle?.number || '-'}</td>
              <td>
                <span className="badge bg-secondary">
                  {r.status}
                </span>
              </td>
              <td style={{ width: '120px' }}>
                <div className="d-flex justify-content-center">
                  <Link
                    to={`/repairs/${r.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteReparation(r.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* LOADING */}
      {loading && <p className="text-center">Chargement...</p>}

      {/* PAGINATION */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </button>
          </li>

          {[...Array(totalPages || 0)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              page === totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ReparationList;