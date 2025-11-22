
import React from 'react';

/**
 * Reusable Card component for year/branch selection.
 */
const Card = ({ title, onClick, children }) => {
  return (
    <div 
      className="ui-card" 
      onClick={onClick}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Card;
