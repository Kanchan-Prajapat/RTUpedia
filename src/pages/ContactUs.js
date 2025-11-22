// src/pages/ContactUs.js

import React from 'react';

const ContactUs = () => {
  return (
    <div className="container">
      <h2>Contact Us</h2>
      <p>
        Have notes to share, found an error, or have a suggestion? We'd love to hear from you!
      </p>
      
      <div style={{marginTop: '20px', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '10px', backgroundColor: 'var(--color-card-bg)'}}>
        <h3 style={{color: 'var(--color-primary)'}}>Reach Out:</h3>
        <p><strong>Email for Notes Submission/Queries:</strong> notes.rtupedia@example.com</p>
        <p><strong>Telegram/WhatsApp:</strong> +91 98765 43210 (Support only)</p>
      </div>
      
      <h3 style={{marginTop: '30px'}}>Contribution Form (Placeholder)</h3>
      <p>
        In the final website, a simple form will be integrated here to allow users to upload PDF notes or submit YouTube links directly.
      </p>
    </div>
  );
};

export default ContactUs;