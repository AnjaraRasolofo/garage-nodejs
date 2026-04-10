import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

function StockList() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const loadMovements = async () => {
    try {
      const res = await API.get('/stock');
      setMovements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📦 Historique des mouvements</h3>
      <Link to="/stock/in-out" className="btn btn-primary mb-3">Ajouter / Retirer des pièces dans le stock</Link>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pièce</th>
              <th>Référence</th>
              <th>Type</th>
              <th>Quantité</th>
              <th>Motif</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {movements.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.part?.name}</td>
                <td>{m.part?.reference}</td>

                <td>
                  {m.type === 'in' ? (
                    <span className="badge bg-success">Entrée</span>
                  ) : (
                    <span className="badge bg-danger">Sortie</span>
                  )}
                </td>

                <td>{m.quantity}</td>
                <td>{m.date}</td>
                <td>{m.reason}</td>
                
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

export default StockList;