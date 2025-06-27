import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchEmployees = async () => {
    const res = await API.get('/employees');
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Supprimer cet employé ?')) {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Les employés</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Poste</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.lastName}</td>
              <td>{emp.name}</td>
              <td>{emp.phone}</td>
              <td>{emp.function}</td>
              <td style={{ width: '100px' }}>
                <div className="d-flex justify-content-center">
                  <Link to={`/edit/${emp._id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp._id)}><i className="bi bi-trash"></i></button>
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
