
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} RTUpedia. All rights reserved.
        </p>

        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/Kanchan-Prajapat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/kanchan-prajapat92577/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          <a
            href="https://www.youtube.com/@RTUpedia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>

          <a
            href="https://wa.me/919257794431"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
