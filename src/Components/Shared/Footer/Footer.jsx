import React from 'react';
import './Footer.css';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import specific icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <NavLink to="/" className="navbar-logo">
          <img src="src/assets/img/logo.png" alt="Logo" />
        </NavLink>
        <ul className='links'>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link to="/scholarships">Scholarships</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="#">Privacy Policy</Link></li>
          <li><Link to="#">Terms of Use</Link></li>
        </ul>
        <div className="social">
          <p>Follow PalScholarships on:</p>
          <a href="https://twitter.com" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} style={{color: "#418447",}} />
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} style={{ color: "#418447" }} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} style={{ color: "#418447" }} />
          </a>
          <a href="https://www.linkedin.com/" aria-label="Linked In">
          <FontAwesomeIcon icon={faLinkedin} style={{color: "#418447",}} />
          </a>
          <a href="https://www.youtube.com/" aria-label="Youtube">
          <FontAwesomeIcon icon={faYoutube} style={{color: "#418447",}} />
          </a>
        </div>
        <p className='copyright'>&copy; 2024 PalScholarships. All rights reserved. </p>
      </div>
    </footer>
  );
}

export default Footer;
