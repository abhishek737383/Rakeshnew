import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/FrontendLayout.css'; // Import your CSS

const FrontendLayout = () => (
  <div className="frontend-layout">
    <Navbar className="navbar" />
    <main className="main">
      <Outlet /> { /* Render the child routes here */}
    </main>
  </div>
);

export default FrontendLayout;
