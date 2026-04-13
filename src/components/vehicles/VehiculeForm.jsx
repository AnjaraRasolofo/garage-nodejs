import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';

const VehicleForm = () => {
  const { id } = useParams(); // id du véhicule
  const [vehicle, setVehicle] = useState(null);
  const [newClient, setNewClient] = useState(false);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    type: '',
  });

  const [vehicleData, setVehicleData] = useState({
    brand: '',
    model: '',
    number: '',
    year: '',
    color: '',
    customerId: '',
  });

  const fetchVehicle = async () => {
    try {
      if (!id) return; //
      const res = await API.get(`/vehicles/${id}`);
      setVehicle(res.data); 
      setVehicleData({
          brand: res.data.brand || '',
          model: res.data.model || '',
          number: res.data.number || '',
          year: res.data.year || '',
          color: res.data.color || '',
          customerId: res.data.customer?.id || '',
        });
    } catch (err) {
      console.error('Erreur lors du chardement de l\'info du véhicule :', err);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get('/customers/list');
        setCustomers(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      }
    };
    fetchVehicle();
    fetchCustomers();
  }, []);

  const handleClientChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let customerId = vehicleData.customerId;

      if (newClient) {
        const res = await API.post('/customers', clientData);
        customerId = res.data.id;
      }

      if (id) {
        await API.put(`/vehicles/${id}`, {
          ...vehicleData,
          year: Number(vehicleData.year),
          customerId,
        });
      } else {
        await API.post('/vehicles', {
          ...vehicleData,
          year: Number(vehicleData.year),
          customerId,
        });
      }

      alert('Véhicule ajouté avec succès !');
      navigate('/vehicles');
    } catch (error) {
      console.error('Erreur lors de l’ajout :', error);
      alert('Erreur lors de l’ajout du véhicule');
    }
  };

  return (
    <Container className="mt-4">
      <div className="card shadow p-4">
      <h2 className="mb-4 text-end border-bottom pb-2">
          {id ? 'Modifier un véhicule' : 'Ajouter un véhicule'}
      </h2>
      <Form onSubmit={handleSubmit}>

        {/* Toggle nouveau client */}
        <Form.Check
          type="switch"
          id="new-client-toggle"
          label="Ajouter un nouveau client"
          checked={newClient}
          onChange={() => setNewClient(!newClient)}
          className="mb-3"
        />

        {/* Nouveau client */}
        {newClient ? (
          <>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control name="firstname" value={clientData.firstname} onChange={handleClientChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control name="lastname" value={clientData.lastname} onChange={handleClientChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" value={clientData.email} onChange={handleClientChange} type="email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control name="phone" value={clientData.phone} onChange={handleClientChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Adresse</Form.Label>
              <Form.Control name="address" value={clientData.address} onChange={handleClientChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={clientData.type} onChange={handleClientChange}>
                <option value="">Sélectionner</option>
                <option value="particulier">Particulier</option>
                <option value="professionnel">Entreprise</option>
              </Form.Select>
            </Form.Group>
          </>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Client existant</Form.Label>
            <Form.Select
              name="customerId"
              value={vehicleData.customerId}
              onChange={handleVehicleChange}
              required
            >
              <option value="">Sélectionner un client</option>
              {Array.isArray(customers) && customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {/* Véhicule */}
        <h4>Véhicule:</h4>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Marque</Form.Label>
              <Form.Control name="brand" value={vehicleData.brand} onChange={handleVehicleChange} required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Modèle</Form.Label>
              <Form.Control name="model" value={vehicleData.model} onChange={handleVehicleChange} required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Immatriculation</Form.Label>
              <Form.Control name="number" value={vehicleData.number} onChange={handleVehicleChange} required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={vehicleData.year}
                onChange={handleVehicleChange}
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submi</div>t" variant="primary">
          {id ? 'Mettre à jour le véhicule' : 'Ajouter le véhicule'}
        </Button>
        <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={() => navigate('/vehicles')}
            >
              Annuler
          </button>
      </Form>
      </div>
    </Container>
    
  );
};

export default VehicleForm;
