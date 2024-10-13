// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
 import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
// import Categories from './pages/Categories';
// import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';


const AppRoutes = () => (
  <Routes>
     <Route path="/" element={<Home />} /> 
    {/* <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/about-us" element={<AboutUs />} /> */} 
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  
  </Routes>
);

export default AppRoutes;
