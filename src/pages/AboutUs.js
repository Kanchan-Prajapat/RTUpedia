// src/pages/AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="container">
      <h2>About RTUpedia</h2>
      <p>
        **RTUpedia** was created by students, for students, with the goal of centralizing all essential academic resources for Rajasthan Technical University B.Tech students. We aim to provide free access to high-quality notes, previous year question (PYQ) papers, and relevant video lectures to help you succeed in your semester exams.
      </p>
      <h3 style={{marginTop: '20px'}}>Our Mission</h3>
      <ul>
        <li>To simplify the search for reliable **RTU study material**.</li>
        <li>To provide semester-wise, unit-wise **PDF notes**.</li>
        <li>To offer easy download options for **Mid-Term and Main Exam PYQs**.</li>
      </ul>
      <p style={{marginTop: '20px'}}>
        We are constantly updating our database and welcome contributions from the RTU community!
      </p>
    </div>
  );
};

export default AboutUs;