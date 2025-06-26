import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers');
      setCustomers(res.data);
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des clients</h2>
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
    </div>
  );
};

export default CustomerList;
