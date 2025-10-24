import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'; 
import myLogo from '../assets/logo.png'; 
import { FaGithub } from 'react-icons/fa'; 

const Header = () => {
  const githubLink = "https://github.com/rifatfahim/AppsHub"; 

  return (
    <header className="header-container">
      <Link to="/" className="header-logo-link">
        <div className="logo-container">
          <img src={myLogo} alt="MERO.IO Logo" className="logo-image" />
          <span className="logo-text">HERO.IO</span>
        </div>
      </Link>

      <nav className="header-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
          end 
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/apps" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Apps
        </NavLink>
        
        <NavLink
          to="/my-installation"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Installation 
        </NavLink>
        </nav>

      <a 
        href={githubLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="contribute-button"
      >
        <FaGithub className="contribute-icon" /> 
        Contribute
      </a>
    </header>
  );
};

export default Header;