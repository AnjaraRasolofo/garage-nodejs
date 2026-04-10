import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';

const RepairForm = () => {

  const [vehicles, setVehicles] = useState([]);
  const [workTemplate, setWorkTemplate] = useState([]);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [showPartForm, setShowPartForm] = useState(false);
  const { id } = useParams();
  

  const [formData, setFormData] = useState({
    vehicle_id: '',
    vehicle: '',
    client: '',
    date: '',
    status: 'pending',
    lines: [],
    parts: []
  });

  const fetchRepair = async () => {
    try {
      const res = await API.get(`/repairs/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVehicles = () => {
    API.get("/vehicles").then((res) => {
      setVehicles(res.data);
    });
  }

  const fetchWorkTemplates = () => {
    API.get("/work-task-templates/list").then((res) => {
      setWorkTemplate(res.data);
    });
  }

  const [currentWorkLine, setCurrentWorkLine] = useState({
    template_id: null,
    custom_title: '',
    labor_cost: '',
    technician: '',
    hours: ''
  });
  
  const [currentPartLine, setCurrentPartLine] = useState({
    name: '',
    quantity: 1,
    price: 0
  });



  const handleAddWorkLine = () => {
    if (!currentWorkLine.custom_title) return; // validation minimale

    setFormData({
      ...formData,
      lines: [...formData.lines, currentWorkLine]
    });

    // reset du formulaire
    setCurrentWorkLine({
      title: '',
      labor_cost: '',
      technician: '',
      hours: ''
    });

    if(showWorkForm) setShowWorkForm(false);
    else setShowWorkForm(true);
  };

  const handleAddPartLine = () => {
  if (!currentPartLine.name) return;

    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, currentPartLine]
    }));

    // reset
    setCurrentPartLine({
      name: '',
      quantity: 1,
      price: 0
    });

    // optionnel
    if(showPartForm) setShowPartForm(false)
    else setShowPartForm(true);
  };

  // ➕ Ajouter pièce
  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, {
        name: '',
        quantity: 1,
        price: 0
      }]
    }));
  };

  // Quand on change le véhicule
  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;

    const selectedVehicle = vehicles.find(
      (v) => v.id === parseInt(vehicleId)
    );

    setFormData({
      ...formData,
      vehicle_id: vehicleId,
      vehicle: selectedVehicle,
      client: selectedVehicle?.customer?.firstname + " " + selectedVehicle?.customer?.lastname || "",
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        vehicle_id: formData.vehicle_id, // ⚠️ pas vehicle.number
        date: formData.date,
        status: formData.status,

        lines: formData.lines.map((line) => ({
          template_id: line.template_id || 1, // à adapter si dynamique
          labor_cost: parseFloat(line.labor_cost) || 0,
          work_task: line.custom_title || "",

          employees: [
            {
              employee_id: line.employee_id || 1, // ⚠️ à connecter plus tard
              role: line.technician || "Mécanicien",
              hours: parseFloat(line.hours) || 0
            }
          ],

          parts: formData.parts.map((p) => ({
            part_id: p.part_id || 1, // ⚠️ temporaire
            title: p.name || "",
            quantity: parseInt(p.quantity) || 0,
            price: parseFloat(p.price) || 0
          }))
        }))
      };

      console.log("PAYLOAD:", payload);

      await API.post("/repairs", payload);

      alert("Réparation enregistrée !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  // 💰 Total
  const total = [
    ...formData.lines.map(l => Number(l.labor_cost)),
    ...formData.parts.map(p => p.quantity * p.price)
  ].reduce((a, b) => a + b, 0);

  // Charger les véhicules
  useEffect(() => {
    fetchVehicles();
    fetchWorkTemplates();
    if (id) {
      fetchRepair(); // mode édition
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
      <h2 className="mb-4 text-end border-bottom pb-2">
          Réparation de véhicule
      </h2> 
      <div className="row">

        {/* ================= LEFT (DISPLAY) ================= */}
        <div className="col-md-8">

          {/* 🚗 VEHICULE */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-3">Informations</h5>
              <p><strong>Véhicule :</strong> {formData.vehicle.number}</p>
              <p><strong>Client :</strong> {formData.client}</p>
              <p><strong>Date :</strong> {formData.date}</p>
              <p><strong>Status :</strong> {formData.status}</p>
            </div>
          </div>

          {/* 🔧 TRAVAUX */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-2">Travaux</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Travail</th>
                    <th>Coût</th>
                    <th>Technicien</th>
                    <th>Heures</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.lines.map((l, i) => (
                    <tr key={i}>
                      <td>{l.custom_title}</td>
                      <td>{l.labor_cost}</td>
                      <td>{l.technician}</td>
                      <td>{l.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🔩 PIECES */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-2">Pièces</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Pièce</th>
                    <th>Qté</th>
                    <th>Prix</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.parts.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.quantity}</td>
                      <td>{p.price}</td>
                      <td>{p.quantity * p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 💰 TOTAL */}
          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total : {total} Ar</h4>
              <button onClick={handleSubmit} className="btn btn-success">
                Enregistrer
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT (FORM) ================= */}
        <div className="col-md-4">

          {/* 📝 INFO */}
          <div className="card mb-3">
            <div className="card-body">
              <h5>Saisie Info</h5>

              {/* Véhicule */}
            <select
              className="form-control mb-2"
              value={formData.vehicle_id}
              onChange={handleVehicleChange}
            >
              <option value="">-- Sélectionner un véhicule --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.registration_number} - {v.model}
                </option>
              ))}
            </select>

              <input
                type="date"
                className="form-control mb-2"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <select
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="pending">En attente</option>
                <option value="in_progress">En cours</option>
                <option value="done">Terminé</option>
                <option value="cancelled">Annuler</option>
              </select>
            </div>
          </div>

          {/* 🔧 FORM TRAVAUX */}
          <div className="card mb-3">
            <div className="card-body">
              <h5>Travaux</h5>

              {!showWorkForm && (
                <button
                  onClick={() => setShowWorkForm(true)}
                  className="btn btn-primary btn-sm mb-2"
                >
                  + Travail
                </button>
              )}

              {showWorkForm && (
                <>
                  <select
                    className="form-control mb-1"
                    value={currentWorkLine.template_id || ""}
                    onChange={(e) => {
                      const selectedId = parseInt(e.target.value);

                      const selectedTemplate = workTemplate.find(
                        t => t.id === selectedId
                      );

                      setCurrentWorkLine({
                        ...currentWorkLine,
                        template_id: selectedId,
                        custom_title: selectedTemplate ? selectedTemplate.title : '',
                        labor_cost: selectedTemplate ? selectedTemplate.defaultLaborCost : ''
                      });
                    }}
                  >
                    <option value="">-- Choisir un travail --</option>
                    {workTemplate.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>

                  <textarea
                    placeholder="Description du travail (modifiable)"
                    className="form-control mb-1"
                    rows={2}
                    value={currentWorkLine.custom_title}
                    onChange={(e) =>
                      setCurrentWorkLine({
                        ...currentWorkLine,
                        custom_title: e.target.value,
                        //template_id: null // 🔥 casse le lien template
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Coût"
                    className="form-control mb-1"
                    value={currentWorkLine.labor_cost}
                    onChange={(e) =>
                      setCurrentWorkLine({ ...currentWorkLine, labor_cost: e.target.value })
                    }
                  /> 

                  <input
                    placeholder="Technicien"
                    className="form-control mb-1"
                    value={currentWorkLine.technician}
                    onChange={(e) =>
                      setCurrentWorkLine({ ...currentWorkLine, technician: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Heures"
                    className="form-control mb-2"
                    value={currentWorkLine.hours}
                    onChange={(e) =>
                      setCurrentWorkLine({ ...currentWorkLine, hours: e.target.value })
                    }
                  />

                  <button
                    onClick={handleAddWorkLine}
                    className="btn btn-success btn-sm me-2"
                  >
                    Ajouter
                  </button>

                  <button
                    onClick={() => setShowWorkForm(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Annuler
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 🔩 FORM PIECES */}
          
          <div className="card mb-3">
            <div className="card-body">
              <h5>Pièces</h5>

              {!showPartForm && (
                <button
                  onClick={() => setShowPartForm(true)}
                  className="btn btn-primary btn-sm mb-2"
                >
                  + Pièce
                </button>
              )}

              {showPartForm && (
                <>
                  <input
                    placeholder="Nom pièce"
                    className="form-control mb-1"
                    value={currentPartLine.name}
                    onChange={(e) =>
                      setCurrentPartLine({ ...currentPartLine, name: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Quantité"
                    className="form-control mb-1"
                    value={currentPartLine.quantity}
                    onChange={(e) =>
                      setCurrentPartLine({
                        ...currentPartLine,
                        quantity: parseInt(e.target.value) || 1
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Prix"
                    className="form-control mb-2"
                    value={currentPartLine.price}
                    onChange={(e) =>
                      setCurrentPartLine({
                        ...currentPartLine,
                        price: parseFloat(e.target.value) || 0
                      })
                    }
                  />

                  <button
                    onClick={handleAddPartLine}
                    className="btn btn-success btn-sm me-2"
                  >
                    Ajouter
                  </button>

                  <button
                    onClick={() => setShowPartForm(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Annuler
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default RepairForm;