import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';

function CustomerVehicles() {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    try {
      const res = await API.get(`/vehicles?customer=${id}`);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [id]);

  return (
    <div className="container mt-4">
      <div className="card p-3 shadow">
        <table className="table">
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
      </div>
    </div>
  );
}

export default CustomerVehicles;