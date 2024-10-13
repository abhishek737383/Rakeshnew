import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/OrderService'; 
import '../adminStyle/OrderManagement.css'; 

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      // Filter only accepted orders
      const acceptedOrders = data.filter(order => order.status === 'Accepted');
      setOrders(acceptedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); 
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    const confirmUpdate = window.confirm(`Are you sure you want to mark Order ID ${orderId} as ${status}?`);
    if (!confirmUpdate) return; // Exit if the user does not confirm

    try {
      await updateOrderStatus(orderId, status);
      setSuccessMessage(`Order ID ${orderId} marked as ${status}.`); // Set success message
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      setError(`Error updating order ${orderId}. Please try again.`); // Set error message
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-management">
      <h1 className="order-management__title">Accepted Orders</h1>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}
      {orders.length === 0 ? (
        <p>No accepted orders available.</p>
      ) : (
        <ul className="order-management__list">
          {orders.map((order) => (
            <li key={order._id} className="order-management__item">
              <h3 className="order-management__order-id">Order ID: {order._id}</h3>
              {/* Render product pictures */}
              <h4>Ordered Products:</h4>
              <ul className="order-management__product-list">
                {Array.isArray(order.cartItems) && order.cartItems.length > 0 ? (
                  order.cartItems.map((item) => (
                    <li key={item._id} className="order-management__product-item">
                      <img src={item.image} alt={item.productName} className="order-management__product-image" />
                      <span className="order-management__product-info">{item.productName} - ₹{item.price} x {item.quantity}</span>
                    </li>
                  ))
                ) : (
                  <p>No products in this order.</p>
                )}
              </ul>
              <div className="order-management__actions">
                <button onClick={() => handleStatusUpdate(order._id, 'Delivered')}>Mark as Delivered</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};  

export default AcceptedOrders;
