import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Container, Form } from 'react-bootstrap';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

function PartList() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchParts = async (page = 1) => {
    try {
      const res = await API.get(`/parts?page=${page}&limit=${limit}&search=${searchTerm}`);
      setParts(res.data.data);
      setPage(res.data.pagination.page);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error('Erreur lors du chargement des pièces détachées :', err);
    }
  };

  const deletePart = async (id) => {
    if (window.confirm('Supprimer cette pièce ?')) {
      await API.delete(`/parts/${id}`);
      fetchParts();
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchParts(page);
  }, [page, limit, searchTerm]);

  return (
    <div className="container mt-4">
      <h2>Catalogue de pièces</h2>
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Link to="/parts/add" className="btn btn-primary mb-3">Ajouter une pièce</Link>
        </Col>
        <Col>
          <Form className="d-flex align-items-center">
            <Form.Label htmlFor="searchTerm" className="me-2 mb-0">
              <i className="bi bi-search"></i>
            </Form.Label>
            <Form.Control
              id="searchTerm"
              type="text"
              placeholder="Rechercher par désignation ou fabricant..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Form>
        </Col>
      </Row>
      
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parts.map(p => (
            <tr key={p.id}>
              <td>{p.reference}</td>
              <td>{p.name} ({p.provider})</td>
              <td>{p.quantity}</td>
              <td style={{ width: '100px' }}>
                <div className="d-flex justify-content-center">
                  <Link to={`/parts/${p.id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deletePart(p.id)}><i className="bi bi-trash"></i></button>
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
}

export default PartList;
