import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">TM</div>
          <span className="logo-text">Theekshana Motors</span>
        </div>

        {/* Menu Section */}
        <div className="menu-section">
          <Link to="/" className="menu-item">Home</Link>
          <a href="#services" className="menu-item">Services</a>
          <a href="#about" className="menu-item">About Us</a>
          <a href="#contact" className="menu-item">Contact</a>
          <a href="#booking" className="menu-item" onClick={(e) => {
          // let the anchor perform scrolling then show selection
          setTimeout(() => {
            window.dispatchEvent(new Event('showBooking'));
          }, 100);
        }}>
          Book Online
        </a>
          <Link to="/admin" className="menu-item">Admin</Link>
        </div>

        {/* Buttons Section */}
        <div className="buttons-section">
          <button className="btn btn-login">Login</button>
          <button className="btn btn-get-started">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
