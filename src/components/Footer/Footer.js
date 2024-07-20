import React from 'react';
import './Footer.css';
import logo from '../../img/footer_logo.png';

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo} alt="S Logo" className="logo" />
      <p className="copyright">©2023 Google Developer Student Club La Trobe University</p>
    </div>
  );
};

export default Footer;
