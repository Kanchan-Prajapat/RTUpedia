// src/components/UI/LoadingSpinner.js

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div className="spinner"></div>
      <p style={{ marginTop: '15px', color: 'var(--color-text)' }}>Loading resources...</p>
    </div>
  );
};

export default LoadingSpinner;
