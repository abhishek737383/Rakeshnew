// src/api/CartService.js

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend API URL

export const addItemToCart = async (item) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  return await response.json();
};

export const fetchCartItems = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/items`);
  return await response.json();
};

export const removeItemFromCart = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/cart/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });
  return await response.json();
};

// New function to update the quantity of cart items
export const updateCartItemQuantity = async (productId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/cart/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return await response.json();
};
