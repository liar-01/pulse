import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-icons-container">
        <Link to="/" className="nav-link">
          <span className="tooltip-text">Home</span>
          <img src="/icons/home.png" alt="" className="nav-icon" />
        </Link>

        <Link to="/search" className="nav-link">
          <span className="tooltip-text">Search</span>
          <img src="/icons/search.png" alt="" className="nav-icon" />
        </Link>

        <Link to="/profile/1" className="nav-link">
          <span className="tooltip-text">Profile</span>
          <img src="/icons/user.png" alt="" className="nav-icon" />
        </Link>
      </div>
    </nav>
  );
};

// NOTE: Imp
export default Navbar;