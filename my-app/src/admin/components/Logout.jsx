import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAdminAuth } from '../context/AdminAuthContext'; // Import your custom admin auth context

const Logout = () => {
  const { setAdmin, logout } = useAdminAuth(); // Destructure setAdmin and logout from AdminAuthContext
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    setAdmin(null); // Clear admin state
    logout(); // Call the logout function from AdminAuthContext
    navigate('/admin/login'); // Redirect to the admin login page
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
