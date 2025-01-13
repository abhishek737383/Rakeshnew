import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FrontendLayout from './components/FrontendLayout';
import AdminLayout from './admin/components/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import UserProfile from './components/UserProfile';
import ThankYouPage from './pages/ThankYouPage'; 
import MyOrdersPage from './pages/MyOrdersPage'; 
import PaymentPage from './pages/PaymentPage';
import About from './pages/About';
import CheckoutPage from './components/CheckoutPage';
import Dashboard from './admin/components/Dashboard';
import AdminSignup from './admin/components/AdminSignup';
import AdminLogin from './admin/components/AdminLogin';
import SliderManage from './admin/components/SliderManage';
import ProductManage from './admin/components/ProductManagement';
import BillManage from './admin/components/BillManage';
import OrderManage from './admin/components/OrderManage';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Logout from './admin/components/Logout'; 
import AddProduct from './admin/components/AddProduct'; 
import EditProduct from './admin/components/EditProduct';
import AdminAllCart from './admin/components/adminAllcart'; 
import PendingOrders from './admin/components/PendingOrders';
import AcceptedOrders from './admin/components/AcceptedOrders';
import DeliveredOrders from './admin/components/DeliveredOrders';
import RejectedOrders from './admin/components/RejectedOrders';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminSignedUp, setIsAdminSignedUp] = useState(false);

  useEffect(() => {
    const signedUp = localStorage.getItem('adminSignedUp') === 'true';
    setIsAdminSignedUp(signedUp);

    const authenticated = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/admin/login'; 
  };

  return (
    <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<FrontendLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />  
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about-us" element={<About />} />
          
        </Route>

        {/* Admin Login and Signup Routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin/sign-up" element={
          isAdminSignedUp ? (
            <Navigate to="/admin/login" />
          ) : (
            <AdminSignup setIsAdminSignedUp={setIsAdminSignedUp} />
          )
        } />

        {/* Logout Route */}
        <Route path="/admin/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminLayout onLogout={handleLogout}>
              <Routes>
                <Route index element={<Navigate to="/admin/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="slider-manage" element={<SliderManage />} />
                <Route path="product-manage" element={<ProductManage />} />
                <Route path="bill-manage" element={<BillManage />} />
                <Route path="order-manage" element={<OrderManage />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:id" element={<EditProduct />} />
                <Route path="cart-manage" element={<AdminAllCart />} />
                <Route path="orders/pending" element={<PendingOrders />} />
                <Route path="orders/accepted" element={<AcceptedOrders />} />
                <Route path="orders/delivered" element={<DeliveredOrders />} />
                <Route path="orders/rejected" element={<RejectedOrders />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
