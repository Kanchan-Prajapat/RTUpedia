// src/components/Layout/Navigation/Breadcrumbs.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A dynamic Breadcrumbs component based on the current path.
 * The 'crumbs' array is passed as props from the parent (e.g., BranchContent).
 * @param {Array<{label: string, path: string}>} crumbs - e.g., [{label: 'Home', path: '/'}, {label: '2nd Year', path: '/year/second-year'}]
 */
const Breadcrumbs = ({ crumbs }) => {
  if (!crumbs || crumbs.length === 0) {
    return null;
  }

  return (
    <div className="breadcrumbs">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.path}>
            {isLast ? (
              <span className="breadcrumbs-current">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="breadcrumbs-link">
                {crumb.label}
              </Link>
            )}
            {!isLast && <span className="breadcrumbs-separator">/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;