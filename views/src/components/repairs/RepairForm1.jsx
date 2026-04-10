import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const RepairForm = () => {

  const [vehicles, setVehicles] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [parts, setParts] = useState([]);

  const [formData, setFormData] = useState({
    vehicle_id: '',
    date: '',
    status: 'pending',
    lines: []
  });

  useEffect(() => {
    fetchVehicles();
    fetchTemplates();
    fetchEmployees();
    fetchParts();
  }, []);

  const fetchVehicles = async () => {
    const res = await API.get('/vehicles');
    setVehicles(res.data);
  };

  const fetchTemplates = async () => {
    const res = await API.get('/work-task-templates');
    setTemplates(res.data);
  };

  const fetchEmployees = async () => {
    const res = await API.get('/employees');
    setEmployees(res.data);
  };

  const fetchParts = async () => {
    const res = await API.get('/parts');
    setParts(res.data);
  };

  // ➕ Ajouter une ligne
  const addLine = () => {
    setFormData(prev => ({
      ...prev,
      lines: [
        ...prev.lines,
        {
          template_id: '',
          labor_cost: 0,
          employees: [],
          parts: []
        }
      ]
    }));
  };

  // ✏️ Modifier une ligne
  const updateLine = (index, field, value) => {
    const newLines = [...formData.lines];
    newLines[index][field] = value;
    setFormData({ ...formData, lines: newLines });
  };

  // ➕ Ajouter employé à une ligne
  const addEmployee = (lineIndex) => {
    const newLines = [...formData.lines];
    newLines[lineIndex].employees.push({
      employee_id: '',
      role: '',
      hours: 0
    });
    setFormData({ ...formData, lines: newLines });
  };

  // ➕ Ajouter pièce à une ligne
  const addPart = (lineIndex) => {
    const newLines = [...formData.lines];
    newLines[lineIndex].parts.push({
      part_id: '',
      quantity: 1,
      price: 0
    });
    setFormData({ ...formData, lines: newLines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/repairs', formData);
      alert('Réparation créée');
    } catch (err) {
      console.error(err);
      alert('Erreur');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nouvelle réparation</h2>

      <form onSubmit={handleSubmit}>

        {/* Véhicule */}
        <select
          className="form-control mb-3"
          value={formData.vehicle_id}
          onChange={(e) =>
            setFormData({ ...formData, vehicle_id: e.target.value })
          }
        >
          <option value="">Choisir véhicule</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.brand} {v.model}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          className="form-control mb-3"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
        />

        {/* Lignes */}
        {formData.lines.map((line, i) => (
          <div key={i} className="border p-3 mb-3">

            <h5>Ligne {i + 1}</h5>

            {/* Template */}
            <select
              className="form-control mb-2"
              value={line.template_id}
              onChange={(e) =>
                updateLine(i, 'template_id', e.target.value)
              }
            >
              <option value="">Travail personnalisé</option>
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>

            {/* Labor cost */}
            <input
              type="number"
              placeholder="Coût main d'œuvre"
              className="form-control mb-2"
              value={line.labor_cost}
              onChange={(e) =>
                updateLine(i, 'labor_cost', e.target.value)
              }
            />

            {/* EMPLOYEES */}
            <button type="button" onClick={() => addEmployee(i)}>
              + Employé
            </button>

            {line.employees.map((emp, j) => (
              <div key={j} className="mt-2">
                <select
                  value={emp.employee_id}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].employees[j].employee_id = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                >
                  <option value="">Choisir employé</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.firstname} {e.lastname}</option>
                  ))}
                </select>

                <input
                  placeholder="Rôle"
                  value={emp.role}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].employees[j].role = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                />

                <input
                  type="number"
                  placeholder="Heures"
                  value={emp.hours}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].employees[j].hours = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                />
              </div>
            ))}

            {/* PARTS */}
            <button type="button" onClick={() => addPart(i)}>
              + Pièce
            </button>

            {line.parts.map((p, k) => (
              <div key={k} className="mt-2">
                <select
                  value={p.part_id}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].parts[k].part_id = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                >
                  <option value="">Choisir pièce</option>
                  {parts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Quantité"
                  value={p.quantity}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].parts[k].quantity = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                />

                <input
                  type="number"
                  placeholder="Prix"
                  value={p.price}
                  onChange={(e) => {
                    const newLines = [...formData.lines];
                    newLines[i].parts[k].price = e.target.value;
                    setFormData({ ...formData, lines: newLines });
                  }}
                />
              </div>
            ))}

          </div>
        ))}

        <button type="button" onClick={addLine}>
          + Ajouter ligne
        </button>

        <br /><br />

        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>

      </form>
    </div>
  );
};

export default RepairForm;