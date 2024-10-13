import axios from 'axios';

export const fetchAllCarts = async () => {
  const response = await axios.get('/api/admin/carts');
  return response.data;
};

export const deleteCart = async (userId) => {
  const response = await axios.delete(`/api/admin/carts/${userId}`);
  return response.data;
};
