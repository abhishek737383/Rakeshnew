import axios from 'axios';

const API_URL = 'https://newsite-1caa.onrender.com/api/orders'; // Base URL for order-related endpoints

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const { userId, cartItems, courierDetails } = orderData;

    console.log('Creating order for user ID:', userId); // Debugging statement

    const response = await axios.post(API_URL, {
      userId,
      cartItems,
      courierDetails,
    });

    console.log('Order created successfully:', response.data); // Debugging statement
    return response.data; // Return the created order data
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
    throw new Error('Unable to create order');
  }
};

// Get all orders (for Admin)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch orders');
  }
};

// Get orders for a specific user
export const getOrders = async (userId) => {
  try {
    console.log('Fetching orders for user ID:', userId); // Debugging statement
    const response = await axios.get(`${API_URL}/user/${userId}`);
    console.log('Fetched user orders:', response.data); // Debugging statement
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch user orders');
  }
};

// Get a specific order by ID (for Admin or order details)
export const getOrderById = async (orderId) => {
  try {
    console.log('Fetching order by ID:', orderId);
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data; // Return the specific order data
  } catch (error) {
    console.error('Error fetching order:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch order details');
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  try {
    console.log('Updating order status for order ID:', orderId, 'to status:', status);
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status });
    return response.data; // Return the updated order data
  } catch (error) {
    console.error('Error updating order status:', error.response ? error.response.data : error.message);
    throw new Error('Unable to update order status');
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Order deleted successfully:', response.data);
    return response.data; // Return a success message or data if necessary
  } catch (error) {
    console.error('Error deleting order:', error.response ? error.response.data : error.message);
    throw new Error('Unable to delete order');
  }
};

