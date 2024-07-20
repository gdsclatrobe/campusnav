import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../img/nav_logo.png';

const Navbar = () => {
    return (
      <div className="navbar-container">
        <nav>
          <a href="/" className="logo-link"><img src={logo} alt="S Logo" className="logo" /></a>
          <ul className="nav-links">
              <li>
                <NavLink to="/" exact activeClassName="active">
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="https://gdsc.community.dev/la-trobe-university-melbourne-australia/" activeClassName="active">
                  <i className="fas fa-user"></i> About
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" activeClassName="active">
                  <i className="fas fa-life-ring"></i> Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/adminlogin" activeClassName="active">
                  <i className="fas fa-sign-in-alt"></i> Login
                </NavLink>
              </li>
          </ul>
        </nav>
      </div>
    );
};

export default Navbar;
