import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LanguageSwitcher from './LanguageSwitcher';

const buttonStyle = {
  color: 'white',
  marginRight: '10px',
  border: 'none',
};

const Navbar = ({ loggedInUser, logout }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#A2E53F' }}>
      
        <a className="navbar-brand mx-3" style={{ fontWeight: 'bold', fontStyle: 'oblique', fontSize: '30px' }} href="/">KabulBus</a>
        <button id='toggler' style={buttonStyle} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="bi bi-list"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#buscompanies">Bus Companies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#buses">Buses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#routes">Routes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#faqs">FAQ</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {loggedInUser ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text mx-3">Welcome, {loggedInUser.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger mx-3" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
              </li>
            )}
          </ul>
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
