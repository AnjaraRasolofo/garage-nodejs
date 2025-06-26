import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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

          <li className="nav-item">
            <a className="nav-link active" href="/">Accueil</a>
          </li>

          

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Clients
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/customers">Liste des clients</a></li>
              <li><a className="dropdown-item" href="/add-customer">Ajouter un client</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Véhicules
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/vehicles">Liste des véhicules</a></li>
              <li><a className="dropdown-item" href="/add-vehicle">Ajouter un véhicule</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Stocks
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/parts">Liste des pièces détachées</a></li>
              <li><a className="dropdown-item" href="/add-part">Ajouter des pièces détachées</a></li>
              <li><a className="dropdown-item" href="/stock-in">Ajouter dans le stock</a></li>
              <li><a className="dropdown-item" href="/stock-out">Sorties des pièces</a></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              Employés
            </a>
            <ul className="dropdown-menu custom-dropdown">
              <li><a className="dropdown-item" href="/employees">Liste des employés</a></li>
              <li><a className="dropdown-item" href="/add-employe">Ajouter un employé</a></li>
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/parametres">Paramètres</a>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
