import axios from 'axios';

const API_URL = 'https://newsite-1caa.onrender.com/api/products';

// Error handler function
const handleError = (error) => {
  console.error("API call failed: ", error.response ? error.response.data : error.message);
  throw error.response ? error.response.data : { message: error.message };
};

// Fetch all products
export const fetchProducts = async (category = '') => {
  try {
    const { data } = await axios.get(`${API_URL}?category=${category}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const { data } = await axios.post(API_URL, productData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Upload image to Cloudinary
export const uploadImage = async (formData) => {
  try {
    const { data } = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleError(error);
  }
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, productData);
    return data;
  } catch (error) {
    handleError(error);
  }
};
