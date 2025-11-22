// src/App.js - Updated to import all necessary components

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import BranchContent from './pages/BranchContent';
import SGPACalculator from "./pages/SGPACalculator";



const App = () => {
  return (
    <Router>
      <Header />
      <main style={{flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dynamic route for year/branch selection */}
          <Route path="/year/:yearSlug" element={<BranchContent />} /> 
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/SGPACalculator" element={<SGPACalculator />} />

          {/* Fallback route for 404 */}
          <Route path="*" element={<div className="container"><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;