import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import API from "../services/api";

const Home = () => {
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchCustomers, setSearchCustomers] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [repFilter, setRepFilter] = useState('day');
  const [stockStats, setStockStats] = useState({
    out_of_stock: 0,
    low_stock: 0,
    total_parts: 0
  });
  const [searchParts, setSearchParts] = useState("");
  const [partsResults, setPartsResults] = useState([]);
  /*
  const fetchCustomers = async () => {
        try {
          const res = await API.get('/customers');
          setCustomers(res.data.data);
        } catch (err) {
          if (err.response?.status === 404) console.error("Erreur lors du chargement des clients"); 
          else console.error("Erreur API :", err);
          setCustomers([]); // fallback propre
        }
  };*/

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res?.data.data ?? []);
    } 
    catch (err) {
      if (err.response?.status === 404) {
        console.error("Erreur lors du chargement des clients");
      } else console.error("Erreur API :", err);
      setEmployees([]); // fallback propre
    }
  };

  const fetchSearchParts = async () => {
    try {
      const res = await API.get('/parts/search', {
        params: {
          search: searchParts
        }
      });
      setSearchParts(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  /*
  const fetchCustomerSummaries = async () => {
    try {
      const res = await API.get('/customers/summary');
      setCustomers(res.data);
      //setFilteredClients(res.data);
    } catch (err) {
      console.error('Erreur chargement résumé clients :', err);
    }
  };

  const fetchVehicles = async () => {
        try {
          const res = await API.get('/vehicles');
          setVehicles(res.data);
        } catch (err) {
          console.error('Erreur lors du chargement des véhicules :', err);
        }
  };
 */
  const fetchStockStats = async () => {
    try {
      const res = await API.get('/dashboard/stock');
      setStockStats(res.data);
    } catch (error) {
      console.error("Error fetching parts stats:", error);
    }
  };
/*
  const fetchInvoiceStats = async () => {
    try {
      const res = await API.get('/invoices/stats');
      setInvoiceStats(res.data);
    } catch (err) {
      console.error("Erreur factures :", err);
    }
  };

  const fetchRepairStats = async (filter) => {
    try {
      const res = await API.get(`/repairs/stats?filter=${filter}`);
      setRepairStats(res.data.total);
    } catch (err) {
      console.error("Erreur stats réparation :", err);
    }
  };
*/
  useEffect(() => {
    
    fetchEmployees();
    fetchStockStats();   

  }, [searchParts]);

  // Gestion employés
  const totalCount = employees.length;
  const availableCount = (employees || []).filter(e => e.status === 'available').length;
  const onLeaveCount = (employees || []).filter(e => e.status === 'on_leave').length;

  // Recherche clients
  /*
  const handleCustomersSearch = (e) => {
  const val = e.target.value.toLowerCase();
  setSearchCustomers(val);
  setFilteredCustomers(
      (customers || []).filter(
        (c) =>
          (c.firstname || '').toLowerCase().includes(val) ||
          (c.email || '').toLowerCase().includes(val) ||
          (c.plate || '').toLowerCase().includes(val) ||
          (c.phone || '').toLowerCase().includes(val)
      )
    );
  };

  const handleInvoicesSearch = (e) => {

  }
*/
  const handleEmployeeSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearchEmployee(val);
    setFilteredEmployees(
      (employees || []).filter(
        (c) =>
          (c.firstname || '').toLowerCase().includes(val) ||
          (c.lastname || '').toLowerCase().includes(val) ||
          (c.function || '').toLowerCase().includes(val) 
      )
    );
  }

  // Filtrage historique
  /*
  const filterRepairs = (customer) => {
    const today = new Date();
    return customer.repairs.filter(r => {
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

  const handlePartSearch = async (e) => {
    const value = e.target.value;
    setSearchParts(value);

    try {
      const res = await API.get("/parts", {
        params: {
          search: value
        }
      });

      setPartsResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };
 */
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
                value={searchEmployee}
                onChange={handleEmployeeSearch}
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Badge bg="success">{availableCount} disponibles</Badge>
                <Button variant="outline-success" size="sm">
                  Voir les dispo
                </Button>
              </div>
              <ListGroup className="mb-3">
                {filteredEmployees.map((emp) => (
                  <ListGroup.Item key={emp.id} className="d-flex justify-content-between">
                    <div>
                      <strong>{emp.firstname} {emp.lastname}</strong> — {emp.function}
                    </div>
                    <Button variant="link" size="sm">
                      Détails
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div>
                <p> Employés total : <strong>{totalCount}</strong></p>
                <p> En congé : <strong className="text-danger">{onLeaveCount}</strong></p>
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
                value=""
                onChange=""
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
                {filteredCustomers.map((client) => (
                  <ListGroup.Item key={client.id} action as={Link} to={`/customer/${client.id}/vehicles`}>
                    <strong>{client.name}</strong> — {client.name} <br />
                     {client.phone} •  {client.email} <br />
                     Nombre de véhicules : <strong>{ client.vehiclesCount ? client.vehiclesCount : 0 }</strong>< br/>
                     Réparations en cours :<strong>{ client.repairsInProgress ? client.repairsInProgress : 0 }</strong> <br />
                     Factures impayées: <strong>{ client.unpaidInvoices ? client.unpaidInvoices : 0 } </strong>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-muted text-sm">
                <p> Véhicules réparés : <strong>0</strong>< br/></p>
                <p> Total des véhicules : 0</p>
              </div>
            </Card.Body>
          </Card>
        </Col>



        {/* Gestion des pièces détachées */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Stock pièces détachées
                <img 
                  src="/images/piece-detachee.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par désignation ..."
                value=""
                onChange=""
                className="mb-3"
              />
              <ListGroup className="mb-3">
                {partsResults.map((part) => (
                  <ListGroup.Item
                    key={part.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{part.name}</strong>
                      <div className="text-muted small">
                        Ref: {part.reference}
                      </div>
                    </div>

                    <div>
                      {part.quantity === 0 ? (
                        <span className="badge bg-danger">Out</span>
                      ) : part.quantity <= part.minQuantity ? (
                        <span className="badge bg-warning text-dark">Low</span>
                      ) : (
                        <span className="badge bg-success">OK</span>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="text-muted text-sm">
                <p> Total stock : {stockStats.total_parts || 0}</p>
                <p> Faible quantité : {stockStats.low_stock || 0}</p>
                <p> Rupture : <strong className="text-danger">{stockStats.out_of_stock || 0}</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Stat des factures */}
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>
                Factures
                <img 
                  src="/images/facture-dachat.png" 
                  alt="clients"
                  style={{ width: '56px', height: '56px', marginLeft: '12px', objectFit: 'contain' }}
                />
              </Card.Title>
              <Form.Control
                type="text"
                placeholder="Rechercher par numéro de facture, nom du client ou immatriculation"
                value=""
                onChange=""
                className="mb-3"
              />
              <div className="text-muted text-sm">
                <p> Brouillons : <strong bg="secondary">0</strong></p>
                <p> Payées : <strong bg="success">0</strong></p>
                <p> Impayées : <strong bg="danger">0</strong></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
