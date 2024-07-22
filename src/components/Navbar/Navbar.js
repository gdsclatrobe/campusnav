import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../img/nav_logo.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Add this import for hamburger icons

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = prompt("Please enter your email:");
        const password = prompt("Please enter your password:");

        console.log("Email entered:", email);
        console.log("Password entered:", password);

        if (email === "gdsclatrobe@gmail.com" && password === "gdsclatrobe.CampusNav@2024$$.2707") {
            console.log("Navigating to /admin");
            navigate('/admin');
        } else {
            alert("Incorrect details");
        }
    };

    return (
      <div className="navbar-container">
        <nav>
          <a href="/" className="logo-link"><img src={logo} alt="S Logo" className="logo" /></a>
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between hamburger and close icon */}
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li>
                <NavLink 
                  to="https://gdscltu.com" 
                  className={({ isActive }) => (isActive ? "active" : undefined)} 
                >
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="https://gdsc.community.dev/la-trobe-university-melbourne-australia/" 
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  <i className="fas fa-user"></i> About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="https://gdscltu.com" 
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  <i className="fas fa-life-ring"></i> Support
                </NavLink>
              </li>
              <li>
                <a href="#" onClick={handleLogin}>
                  <i className="fas fa-sign-in-alt"></i> Login
                </a>
              </li>
          </ul>
        </nav>
      </div>
    );
};

export default Navbar;
