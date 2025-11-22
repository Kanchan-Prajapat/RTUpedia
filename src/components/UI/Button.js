// src/components/UI/Button.js

import React from 'react';

/**
 * Reusable Button component applying global CSS styles.
 */
const Button = ({ children, onClick, disabled, type = 'button', className = 'btn-primary', style = {} }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;