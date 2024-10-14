import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = ({ setIsAdminSignedUp }) => {
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://newsite-1caa.onrender.com/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secretKey }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminSignedUp', 'true');
        setIsAdminSignedUp(true);
        navigate('/admin/login');
      } else {
        setError(data.message || 'Invalid secret key');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="password"
          placeholder="Enter Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminSignup;
