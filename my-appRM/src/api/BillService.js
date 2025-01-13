import axios from 'axios';

// Set the base URL for the API
const API_URL = 'https://newsite-1caa.onrender.com/api/bills'; // This should be correct


export const fetchBillDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/details`); // Ensure this endpoint exists
    return response.data;
  } catch (error) {
    console.error('Error fetching bill details:', error);
    throw error; // Propagate the error for handling in the component
  }
};

export const uploadBillDetails = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading bill details:', error);
    throw error; // Propagate the error for handling in the component
  }
};
