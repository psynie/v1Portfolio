import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Abbas</h3>
          <p>Software Developer • Full-Stack • AI/ML Engineer</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com/psynie" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/abbas00" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/linkedIn.png" alt="LinkedIn" />
            </a>
            <a href="mailto:shaikabbuabbasali@gmail.com" aria-label="Email">
              <img src="/gmail.png" alt="Email" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Abbas. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
