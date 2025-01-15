import axios from 'axios';

// Base URL
const BASE_URL = 'https://rakeshnew.onrender.com/api';

// Signup Function
export const signupUser = async (name, email, phone, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      name,
      email,
      phone,
      password,
    });
    return {
      userId: response.data.userId,
      name: response.data.name,
      token: response.data.token,
    };
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Login User
export const loginUser = async (phone, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      phone,
      password,
    });
    console.log('Response from login API:', response.data);
    return {
      userId: response.data.userId,
      name: response.data.name,
      token: response.data.token,
    };
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Admin Functions
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Admin login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/register`, adminData);
    return response.data;
  } catch (error) {
    console.error('Admin registration failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAdminDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/details`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch admin details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch User Profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Update profile failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};
