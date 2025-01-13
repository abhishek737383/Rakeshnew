import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import '../styles/Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">E-Shop</h2>
          <p className="footer-description">
            Your one-stop shop for all things amazing. Explore our range of products and enjoy exclusive deals and offers.
          </p>
        </div>
        <div className="footer-section links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            {/* <li><Link to="/">Home</Link></li> */}
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about-us">About-us And Contact </Link></li>
           
          </ul>
        </div>
        <div className="footer-section social">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
