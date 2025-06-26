import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import API from '../../services/api';

const StockMovementForm = () => {
  const [parts, setParts] = useState([]);
  const [partId, setPartId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [type, setType] = useState('IN');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await API.get('/parts');
        setParts(res.data);
      } catch (err) {
        console.error('Erreur de chargement des pièces');
      }
    };
    fetchParts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const endpoint = type === 'IN' ? '/parts/in' : '/parts/out';
      const res = await API.post(endpoint, {
        partId,
        quantity: Number(quantity),
        note
      });
      setMessage(res.data.message);
      setPartId('');
      setQuantity(1);
      setNote('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Mouvement de stock</h4>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Pièce</Form.Label>
          <Form.Select value={partId} onChange={(e) => setPartId(e.target.value)} required>
            <option value="">-- Sélectionner une pièce --</option>
            {parts.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.quantity})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type de mouvement</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="IN">Entrée</option>
            <option value="OUT">Sortie</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantité</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Commentaire (facultatif)</Form.Label>
          <Form.Control
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Valider'}
        </Button>
      </Form>
    </div>
  );
};

export default StockMovementForm;
