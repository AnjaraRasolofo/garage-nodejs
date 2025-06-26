import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup } from 'react-bootstrap';

const Home = () => {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
      // Remplace ça par un fetch réel vers ton backend
      const mockEmployees = [
        { id: 1, name: 'Alice', role: 'Mécanicienne', status: 'available', skills: ['freinage'] },
        { id: 2, name: 'Bob', role: 'Carrossier', status: 'on_leave', skills: ['peinture'] },
        { id: 3, name: 'Charlie', role: 'Technicien', status: 'available', skills: ['diagnostic'] },
      ];
      setEmployees(mockEmployees);
      setFiltered(mockEmployees);
    }, []);

    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      setFiltered(
        employees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(term) ||
            emp.role.toLowerCase().includes(term) ||
            emp.skills.join(' ').toLowerCase().includes(term)
        )
      );
    };

    const filterAvailable = () => {
      setFiltered(employees.filter((emp) => emp.status === 'available'));
    };

    const totalCount = employees.length;
    const availableCount = employees.filter((e) => e.status === 'available').length;
    const onLeaveCount = employees.filter((e) => e.status === 'on_leave').length;

    
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Bienvenue dans Garage Manager</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Gestion des employés</Card.Title>
              <Card.Text>
                Consultez, ajoutez ou modifiez les informations du personnel.
              </Card.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher par nom, poste ou compétence"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="success">{availableCount} disponibles</Badge>
                <Button variant="outline-success" size="sm" onClick={filterAvailable}>
                  Voir les dispo
                </Button>
              </div>
              <ListGroup className="mb-3">
                {filtered.map((emp) => (
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
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Gestion des clients</Card.Title>
              <Card.Text>
                Visualisez la liste des clients, ajoutez-en de nouveaux ou mettez à jour les informations existantes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
