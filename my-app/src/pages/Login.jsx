import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { loginUser } from '../api/auth'; // Import the loginUser function
import '../styles/AuthForm.css';
import { useAuth } from '../context/AuthContext'; // Context to manage authentication

const Login = () => {
  const [phone, setPhone] = useState('');  // For phone input
  const [password, setPassword] = useState('');  // For password input
  const [error, setError] = useState('');  // For handling errors
  const navigate = useNavigate();
  const { login } = useAuth();  // Get login method from AuthContext

  // Validate phone number format (10 digits)
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset errors

    // Validate phone number before submitting
    if (!isValidPhone(phone)) {
      setError('Please enter a valid phone number (10 digits).');
      return;
    }

    try {
      // Call loginUser and destructure the response
      const { userId, name, token } = await loginUser(phone, password); 
      
      console.log('Login successful:', { userId, name, token });

      // Store the full user data in context (assuming login is from useAuth)
      login({ userId, name, token });

      // Redirect to the homepage after successful login
      navigate('/'); 
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} className="auth-form">
        <Typography variant="h5" gutterBottom className="form-title">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            className="form-input"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            className="form-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
