import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../api/OrderService'; // Ensure the deleteOrder function is imported
import '../adminStyle/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      console.log('Fetched Orders:', data);
      setOrders(data);
    } catch (error) {
      console.error('Fetch Orders Error:', error);
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const copyCustomerData = (order) => {
    const customerData = `
      Order ID: ${order._id}
      Customer Name: ${order.courierDetails?.fullName || 'N/A'}
      Contact: ${order.courierDetails?.contactNo || 'N/A'}
      Address: ${order.courierDetails?.address || 'N/A'}
      City: ${order.courierDetails?.city || 'N/A'}
      State: ${order.courierDetails?.state || 'N/A'}
      Pincode: ${order.courierDetails?.pincode || 'N/A'}
      Size: ${order.courierDetails?.size || 'N/A'}
      Quantity: ${order.courierDetails?.quantity || 1}
      Total: ₹${order.totalAmount || 0}
      Status: ${order.status || 'Pending'}
    `;
    
    navigator.clipboard.writeText(customerData)
      .then(() => {
        alert('Customer data copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      console.log('Deleting order with ID:', orderId); // Log the order ID being deleted
      try {
        await deleteOrder(orderId); // Call the delete order API
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert('Order deleted successfully');
      } catch (error) {
        console.error('Failed to delete order:', error);
        alert('Failed to delete order.');
      }
    }
  };
  
  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-management">
      <h1 className="order-management__title">Order Management</h1>
      
      {/* Filter Options */}
      <div className="order-management__filter">
        <label htmlFor="filter">Filter by status: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Delivered">Delivered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul className="order-management__list">
          {filteredOrders.map((order) => (
            <li key={order._id} className="order-management__item">
              <h3 className="order-management__order-id">Order ID: {order._id}</h3>
              <p><strong>Customer Name:</strong> {order.courierDetails?.fullName || 'N/A'}</p>
              <p><strong>Contact:</strong> {order.courierDetails?.contactNo || 'N/A'}</p>
              <p><strong>Address:</strong> {order.courierDetails?.address || 'N/A'}</p>
              <p><strong>City:</strong> {order.courierDetails?.city || 'N/A'}</p>
              <p><strong>State:</strong> {order.courierDetails?.state || 'N/A'}</p>
              <p><strong>Pincode:</strong> {order.courierDetails?.pincode || 'N/A'}</p>
              <p><strong>Size:</strong> {order.courierDetails?.size || 'N/A'}</p>
              <p><strong>Quantity:</strong> {order.courierDetails?.quantity || 1}</p>
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
              <p><strong>Total:</strong> ₹{order.totalAmount || 0}</p>
              <p className="order-management__status"><strong>Status:</strong> {order.status || 'Pending'}</p>
              <button onClick={() => copyCustomerData(order)}>Copy Customer Data</button>
              
              {/* Status buttons with updated class names */}
              {order.status === 'Pending' && (
                <>
                  <button className="accept-order" onClick={() => handleUpdateOrderStatus(order._id, 'Accepted')}>Accept Order</button>
                  <button className="reject-order" onClick={() => handleUpdateOrderStatus(order._id, 'Rejected')}>Reject Order</button>
                </>
              )}
              <button className="delete-order" onClick={() => handleDeleteOrder(order._id)}>Delete Order</button> {/* Delete button */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderManagement;
