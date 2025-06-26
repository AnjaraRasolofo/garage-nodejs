import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Dropdown } from 'react-bootstrap';
import API from "../services/api";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchClient, setSearchClient] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [repFilter, setRepFilter] = useState('day');

  const fetchCustomers = async () => {
        try {
          const res = await API.get('/customers');
          setClients(res.data);
        } catch (err) {
          console.error('Erreur lors du chargement des clients :', err);
        }
  };

  useEffect(() => {
    // Données mockées
    setEmployees([
      { id: 1, name: 'Alice', role: 'Mécanicienne', status: 'available', skills: ['freinage'] },
      { id: 2, name: 'Bob', role: 'Carrossier', status: 'on_leave', skills: ['peinture'] },
      { id: 3, name: 'Charlie', role: 'Technicien', status: 'available', skills: ['diagnostic'] },
    ]);

    fetchCustomers();
    
    /*
    const mockClients = [
      {
        id: 1,
        name: 'Jean Martin',
        email: 'jean@mail.com',
        phone: '0611223344',
        plate: 'AB-123-CD',
        repairs: [
          { status: 'in_progress', date: '2025-06-17' },
          { status: 'done', date: '2025-06-10' },
        ],
        appointments: 2,
        invoices: 1,
      },
      {
        id: 2,
        name: 'Claire Dubois',
        email: 'claire@mail.com',
        phone: '0622334455',
        plate: 'EF-456-GH',
        repairs: [{ status: 'done', date: '2025-06-15' }],
        appointments: 0,
        invoices: 0,
      },
    ];*/
    //setClients(fetchCustomers);
    //setFilteredClients(mockClients);
  }, []);

  // Gestion employés
  const totalCount = employees.length;
  const availableCount = employees.filter(e => e.status === 'available').length;
  const onLeaveCount = employees.filter(e => e.status === 'on_leave').length;

  console.log(clients);
  // Recherche clients
  const handleClientSearch = (e) => {
  const val = e.target.value.toLowerCase();
  setSearchClient(val);
  setFilteredClients(
      (clients || []).filter(
        (c) =>
          (c.name || '').toLowerCase().includes(val) ||
          (c.email || '').toLowerCase().includes(val) ||
          (c.plate || '').toLowerCase().includes(val) ||
          (c.phone || '').toLowerCase().includes(val)
      )
    );
  };

  // Filtrage historique
  const filterRepairs = (client) => {
    const today = new Date();
    return client.repairs.filter(r => {
      const date = new Date(r.date);
      if (repFilter === 'day') return date.toDateString() === today.toDateString();
      if (repFilter === 'week') {
        const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        return date >= firstDay && date <= lastDay;
      }
      if (repFilter === 'month') return date.getMonth() === today.getMonth();
      return true;
    });
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Bienvenue dans Garage Manager</h1>
      <Row>
        {/* Gestion des employés */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Gestion des employés 
                <img 
                  src="/images/employes.png" 
                  alt="employes"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, poste ou compétence"
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="success">{availableCount} disponibles</Badge>
                <Button variant="outline-success" size="sm">
                  Voir les dispo
                </Button>
              </div>
              <ListGroup className="mb-3">
                {employees.map((emp) => (
                  <ListGroup.Item key={emp.id} className="d-flex justify-content-between">
                    <div>
                      <strong>{emp.name}</strong> — {emp.role}
                    </div>
                    <Button variant="link" size="sm">
                      Détails
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div>
                <p>📊 Employés total : <strong>{totalCount}</strong></p>
                <p>🌴 En congé : <strong className="text-danger">{onLeaveCount}</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Gestion des clients */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Gestion des clients 
                <img 
                  src="/images/public-service.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, immatriculation, téléphone ou email"
                value={searchClient}
                onChange={handleClientSearch}
                className="mb-3"
              />
              <Dropdown className="mb-2">
                <Dropdown.Toggle size="sm" variant="secondary">
                  Historique : {repFilter === 'day' ? 'Aujourd’hui' : repFilter === 'week' ? 'Semaine' : 'Mois'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setRepFilter('day')}>Aujourd’hui</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRepFilter('week')}>Cette semaine</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRepFilter('month')}>Ce mois</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ListGroup className="mb-3">
                {filteredClients.map((client) => (
                  <ListGroup.Item key={client.id}>
                    <strong>{client.name}</strong> — {client.name} <br />
                    📞 {client.phone} • ✉️ {client.email} <br />
                    🔧 Réparations en cours :{' '}
                    {client.repairs.filter(r => r.status === 'in_progress').length} <br />
                    📆 Rendez-vous : {client.appointments} • 🧾 Factures : {client.invoices} <br />
                    📋 Historique : {filterRepairs(client).length} réparation(s)
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-muted text-sm">
                <p>📊 Total clients : {clients.length}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
