import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

function PartList() {
  const [parts, setParts] = useState([]);

  const fetchParts = async () => {
    const res = await API.get('/parts');
    setParts(res.data);
  };

  const deletePart = async (id) => {
    if (window.confirm('Supprimer cette pièce ?')) {
      await API.delete(`/parts/${id}`);
      fetchParts();
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Catalogue de pièces</h2>
      <Link to="/add" className="btn btn-primary mb-3">Ajouter une pièce</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Nom</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parts.map(p => (
            <tr key={p._id}>
              <td>{p.reference}</td>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td style={{ width: '100px' }}>
                <div className="d-flex justify-content-center">
                  <Link to={`/parts/${p._id}`} className="btn btn-warning btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                  <button className="btn btn-danger btn-sm" onClick={() => deletePart(p._id)}><i className="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PartList;
