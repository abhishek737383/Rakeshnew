import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAdminDetails } from '../../api/auth'; // Your API call

// Create AdminAuthContext for admins
const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // State to hold admin data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken'); // Separate key for admin

    const fetchAdmin = async () => {
      if (token) {
        try {
          const data = await getAdminDetails(); // Fetch admin details
          setAdmin(data);
          localStorage.setItem('admin', JSON.stringify(data)); // Store admin data separately
          localStorage.setItem('isAdminAuthenticated', true); // Admin-specific auth state
        } catch (error) {
          console.error('Error fetching admin details:', error);
          setAdmin(null);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('isAdminAuthenticated');
        }
      } else if (location.pathname !== '/admin/signup') {
        navigate('/admin/login');
      }
      setLoading(false);
    };

    fetchAdmin();
  }, [location.pathname, navigate]);

  // Admin login function
  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('adminToken', adminData.token); // Store admin token separately
    localStorage.setItem('admin', JSON.stringify(adminData)); // Admin-specific auth state
    localStorage.setItem('isAdminAuthenticated', true);
    navigate('/admin/dashboard');
  };

  // Admin logout function
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken'); // Only remove admin data
    localStorage.removeItem('admin');
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use AdminAuthContext
export const useAdminAuth = () => useContext(AdminAuthContext);
