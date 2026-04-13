import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Container, Form } from 'react-bootstrap';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  
  const fetchEmployees = async (page = 1) => {
    try 
    {
      const res = await API.get(`/employees?page=${page}&limit=${limit}&search=${searchTerm}`);
      setEmployees(res.data.data);
      setPage(res.data.pagination.page);
      setTotal(res.data.pagination.total);
    }
    catch(err) 
    {
      console.error('Erreur lors du chargement des employées :', err);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Supprimer cet employé ?')) {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };

  const handleAddEmployee = () => {
    navigate('/employees/add');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchEmployees();
  }, [page, limit, searchTerm]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Les employés du garage</h2>
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddEmployee}>
            Ajouter 
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
              placeholder="Rechercher par nom ou poste..."
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
            <th>Poste</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.lastname} {emp.firstname}</td>
              <td>{emp.phone}</td>
              <td>{emp.function}</td>
              <td style={{ width: '100px' }}>
                <div className="d-flex justify-content-center">
                  <Link to={`/employees/${emp.id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp.id)}><i className="bi bi-trash"></i></button>
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
};

export default EmployeeList;
