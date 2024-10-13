import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
const FrontendLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet /> {/* Render the child routes here */}
    </main>
  </>
);

export default FrontendLayout;
