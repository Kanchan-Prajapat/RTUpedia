// src/components/Layout/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const headerStyle = {
  backgroundColor: 'var(--color-primary)',
  padding: '15px 0',
  color: 'var(--color-background)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const linkStyle = {
  color: 'var(--color-background)',
  textDecoration: 'none',
  margin: '0 15px',
  fontWeight: '600',
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={navContainerStyle}>
        <Link to="/" style={{ color: 'var(--color-background)', textDecoration: 'none' }}>
          <h1>📚 RTUpedia</h1>
        </Link>
        
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/about" style={linkStyle}>About Us</Link>
          <Link to="/contact" style={linkStyle}>Contact Us</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;