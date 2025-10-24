import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 
import myLogo from '../assets/logo.png'; 
import { FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-content">
      
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo-link">
            <div className="logo-container">
              <img src={myLogo} alt="MERO.IO Logo" className="logo-image" />
              <span className="logo-text">HERO.IO</span>
            </div>
          </Link>
        </div>

        <div className="footer-social-section">
          <p className="social-links-title">Social Links</p>
          <div className="social-icons">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaLinkedinIn className="social-icon" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaFacebookF className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>Copyright &copy; {new Date().getFullYear()} &bull; All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;