import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../api/OrderService'; 
import '../adminStyle/OrderManagement.css'; 

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      // Filter only delivered orders
      const deliveredOrders = data.filter(order => order.status === 'Delivered');
      setOrders(deliveredOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); 
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-management">
      <h1 className="order-management__title">Delivered Orders</h1>
      {orders.length === 0 ? (
        <p>No delivered orders available.</p>
      ) : (
        <ul className="order-management__list">
          {orders.map((order) => (
            <li key={order._id} className="order-management__item">
              <h3 className="order-management__order-id">Order ID: {order._id}</h3>
              {/* Render product pictures and details */}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveredOrders;
