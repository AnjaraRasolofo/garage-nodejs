import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">Garage Manager</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Clients
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/customers">Liste des clients</a></li>
              <li><a className="dropdown-item" href="/customers/add">Ajouter un client</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Véhicules
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/vehicles">Liste des véhicules</a></li>
              <li><a className="dropdown-item" href="/vehicles/add">Ajouter un véhicule</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Réparations
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/repairs">Liste des véhicules en cours de réparation</a></li>
              <li><a className="dropdown-item" href="/repairs/add">Ajouter des réparations sur un véhicule</a></li>
              <li><a className="dropdown-item" href="/">Facturer des réparations</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Stocks
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/parts">Liste des pièces détachées</a></li>
              <li><a className="dropdown-item" href="/parts/add">Ajouter des pièces détachées</a></li>
              <li><a className="dropdown-item" href="/stock">Mouvements des pièces</a></li>
              <li><a className="dropdown-item" href="/stock/in-out">Ajouter / Retier dans le stock</a></li>
              
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Employés
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/employees">Liste des employés</a></li>
              <li><a className="dropdown-item" href="/employees/add">Ajouter un employé</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Paramètres</a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="#">🌍 Général (devise, langue)</a></li>
              <li><a className="dropdown-item" href="#">🏢 Garage</a></li>
              <li><a className="dropdown-item" href="#">💰 Finance</a></li>
              <li><a className="dropdown-item" href="#">🚗 Métier</a></li>
              <li><a className="dropdown-item" href="#">📄 Facturation</a></li>
              <li><a className="dropdown-item" href="#">🔐 Utilisateurs</a></li>
            </ul>
          </li> 

          {/* lien logout uniquement si connecté */}
          {token && (
          <li className="nav-item">
            <button
              onClick={handleLogout}
              className="nav-link btn btn-link"
              style={{
                border: "none",
                background: "none",
                cursor: "pointer"
              }}
            >
              Déconnexion
            </button>
          </li>)}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
