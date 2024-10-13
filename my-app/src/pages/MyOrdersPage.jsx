import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/OrderService'; // Adjust the path as needed
import { useAuth } from '../context/AuthContext';
import '../styles/MyOrdersPage.css'; // Ensure your CSS file is properly linked
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCheckCircle, faRupeeSign, faCalendarAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Access user from AuthContext
  const [loading, setLoading] = useState(true);

  // Replace with your WhatsApp number and message
  const whatsappNumber = '9140726581';
  const whatsappMessage = 'Hello, I have a query regarding my order!';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.userId) {
        console.error('User is not logged in or missing ID');
        setLoading(false);
        return;
      }
      try {
        const userOrders = await getOrders(user.userId);
        setOrders(userOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="my-orders-page">
      <h1 className="my-orders-page__title">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="my-orders-page__list">
          {orders.map(order => (
            <li key={order._id} className="my-orders-page__order-item">
              <h3 className="my-orders-page__order-id">
                <FontAwesomeIcon icon={faBox} /> Order ID: {order._id}
              </h3>
              <p className="my-orders-page__order-status">
                <FontAwesomeIcon icon={faCheckCircle} /> Status: {order.status}
              </p>
              <p className="my-orders-page__order-total">
                <FontAwesomeIcon icon={faRupeeSign} /> Total: ₹{order.totalAmount}
              </p>
              <p className="my-orders-page__order-date">
                <FontAwesomeIcon icon={faCalendarAlt} /> Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="my-orders-page__delivery-time">
                <FontAwesomeIcon icon={faTruck} /> Order delivery time: 7 days
              </p>
              <p className="my-orders-page__query-info">
                <FontAwesomeIcon icon={faWhatsapp} /> For tracking ID or any queries ::<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-link">connect with us on WhatsApp</a>.
              </p>
              <ul className="my-orders-page__item-list">
                {order.cartItems.map(item => (
                  <li key={item.productId} className="my-orders-page__item">
                    <img src={item.image} alt={item.name} className="my-orders-page__item-image" />
                    <span className="my-orders-page__item-name">{item.name}</span> - 
                    <span className="my-orders-page__item-price"> ₹{item.price} (x{item.quantity})</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrdersPage;
