// src/components/Layout/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: 'var(--color-primary)',
        padding: '12px 0',
        color: 'var(--color-background)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          flexWrap: 'wrap', /* ✅ Allows stacking on mobile */
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              color: 'var(--color-background)',
              fontFamily: 'EB Garamond',
              margin: 0,
              padding: '6px 0',
              fontSize: '28px',
              transition: 'font-size 0.3s',
            }}
          >
            RTUpedia
          </h1>
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/about"
            style={{
              color: 'var(--color-background)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'color 0.3s',
            }}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            style={{
              color: 'var(--color-background)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'color 0.3s',
            }}
          >
            Contact Us
          </Link>

          {/* Theme Toggle stays last */}
          <ThemeToggle />
        </nav>
      </div>

      {/* ✅ Mobile Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            header h1 {
              font-size: 22px !important;
            }

            header nav {
              width: 100%;
              justify-content: center;
              margin-top: 10px !important;
            }

            header nav a {
              font-size: 14px !important;
              margin: 0 8px !important;
            }
          }

          @media (max-width: 480px) {
            header nav {
              gap: 10px !important;
            }

            header nav a {
              font-size: 13px !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
