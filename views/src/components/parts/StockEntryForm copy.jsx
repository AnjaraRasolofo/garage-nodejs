import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const StockEntryForm = () => {
  const [parts, setParts] = useState([]);
  const [partId, setPartId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Charger les pièces
  useEffect( () => {

    API.get('/parts')
        .then(res => setParts(res.data))
        .catch(() => setMessage('Erreur lors du chargement des pièces.'));

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/parts/in', {
        partId,
        quantity: parseInt(quantity),
        note
      });

      setMessage('Entrée enregistrée avec succès');
      setQuantity('');
      setNote('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur serveur');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h4>Entrée de stock</h4>
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
          {loading ? <Spinner animation="border" size="sm" /> : 'Ajouter'}
        </Button>
      </Form>
    </div>
  );
};

export default StockEntryForm;
