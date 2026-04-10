import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Spinner, Card, ListGroup, Button } from 'react-bootstrap';

const CustomerVehiclesList = () => {
  const { id } = useParams(); // client ID from URL
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCustomerDetails = (id) => {
    return API.get(`/customers/${id}/vehicles`);
  };

  useEffect(() => {
    getCustomerDetails(id)
      .then(res => {
        setCustomer(res.data.customer);
        setVehicles(res.data.vehicles);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Fiche Client</Card.Title>
          <Card.Text><strong>Nom :</strong> {customer.firstname} {customer.lastname}</Card.Text>
          <Card.Text><strong>Téléphone :</strong> {customer.phone}</Card.Text>
          <Card.Text><strong>Email :</strong> {customer.email}</Card.Text>
        </Card.Body>
      </Card>

      <h4>Véhicules</h4>
      {vehicles.length > 0 ? (
      <ListGroup className="mb-3">
        {vehicles.map(vehicle => (
          <ListGroup.Item key={vehicle._id}>
            <strong>{vehicle.brand} {vehicle.model}</strong> - Immatriculation : {vehicle.number} - Année : {vehicle.year}
          </ListGroup.Item>
        ))}
      </ListGroup>
      ) : (
        <p>Aucun véhicule enregistré pour ce client.</p>
      )}
      
      <div className="d-flex">
        <Button variant="secondary" onClick={() => navigate(-1)} className="me-2">← Précédent</Button>
        <Button variant="primary" href={`/vehicles/new?clientId=${customer._id}`}>Ajouter un véhicule</Button>
      </div>
    </div>
  );
};

export default CustomerVehiclesList;
