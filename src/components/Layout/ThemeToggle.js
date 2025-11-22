// src/components/Layout/ThemeToggle.js

import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const toggleButtonStyle = {
  background: 'var(--color-primary)',
  color: 'var(--color-background)',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      style={toggleButtonStyle} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default ThemeToggle;