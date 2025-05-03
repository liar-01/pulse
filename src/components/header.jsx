import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';
import '../styles/styles.css';

const Header = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    // 
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const getPageTitle = () => {
    if (location.pathname.startsWith('/profile')) return 'Profile';
    if (location.pathname.startsWith('/post/')) return 'Your Posts';
    if (location.pathname === '/search') return 'Search';
    if (location.pathname === '/add-post') return 'Add Post';
    if (location.pathname === '/messages') return 'Messages';
    if (location.pathname === '/') return 'Home';
    return '';
  };

  return (
    <header className="app-header">
      <Link to="/" className="brand-container">
        <img 
          src="/icons/pulse.png" 
          alt="Pulse Logo" 
          className="logo" 
        />
        <h1 className="app-name">Pulse</h1>
      </Link>

      <h2 className="page-title">{getPageTitle()}</h2>

      <div className="header-icons">
        <div 
          className="header-icon theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          role="button"
          tabIndex={0}
        >
          {darkMode ? (
            <img src="/icons/sun.png" alt="Light Mode" className="theme-icon" />
          ) : (
            <img src="/icons/moon.png" alt="Dark Mode" className="theme-icon" />
          )}
          <span className="tooltip-text">
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </span>
        </div>

        <Link to="/add-post" className="header-icon">
          <img src="/icons/add-post.png" alt="Add Post" className="header-icon-img" />
          <span className="tooltip-text">Add Post</span>
        </Link>
        <Link to="/messages" className="header-icon">
          <img src="/icons/message.png" alt="Messages" className="header-icon-img" />
          <span className="tooltip-text">Messages</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;