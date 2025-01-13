// src/pages/AdminCartPage.jsx

import React, { useEffect, useState } from 'react';
import { fetchCartItems, removeItemFromCart } from '../../api/CartService';
// import '../styles/AdminCartPage.css';

const AdminCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems(); // Fetch all cart items
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };
    loadCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeItemFromCart(productId);
      setCartItems(cartItems.filter(item => item.productId !== productId));
      alert('Product removed from cart!');
    } catch (error) {
      console.error('Error removing product from cart:', error);
      alert('Failed to remove product from cart. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-cart-page">
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <div>No items in the cart.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCartPage;
