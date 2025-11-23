// src/components/Layout/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-background)',
        textAlign: 'center',
        padding: '18px 10px',
        marginTop: 'auto',
        fontSize: '0.95rem',
      }}
    >
      <div className="container">
        &copy; {new Date().getFullYear()} RTUpedia. Your centralized RTU Notes and PYQ hub.
      </div>

      {/* Responsive Footer Style */}
      <style>
        {`
          @media (max-width: 768px) {
            footer {
              font-size: 0.85rem !important;
              padding: 16px 8px !important;
            }
          }

          @media (max-width: 480px) {
            footer {
              font-size: 0.78rem !important;
              padding: 14px 5px !important;
              line-height: 1.4 !important;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
