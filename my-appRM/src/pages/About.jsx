import React from 'react';
import '../styles/About.css'; // Assuming you will add custom styles here

const About = () => {
  // Replace with your WhatsApp number and message
  const whatsappNumber = '9140726581';
  const message = 'Hello, I would like to know more about your services!';

  // WhatsApp URL with pre-filled message
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our store! We are dedicated to providing the best products and services to our customers. Feel free to reach out to us for any queries.
      </p>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
        <button className="whatsapp-button">
          Connect with us on WhatsApp
        </button>
      </a>
    </div>
  );
};

export default About;
