// src/components/Layout/Footer.js

import React from 'react';

const footerStyle = {
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-background)',
  textAlign: 'center',
  padding: '15px 0',
  marginTop: 'auto', // Pushes footer to the bottom
  fontSize: '0.9rem',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="container">
        &copy; {new Date().getFullYear()} RTUpedia. Your centralized RTU Notes and PYQ hub.
      </div>
    </footer>
  );
};

export default Footer;