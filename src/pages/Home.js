// src/pages/Home.js - Now uses YearSection component

import React from 'react';
import YearSelection from './YearSelection';

const Home = () => {
  return (
    <div className="container">
      <YearSelection />
    </div>
  );
};

export default Home;
