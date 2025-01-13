// src/pages/CartPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css'; // Import the CSS file

const CartPage = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_CART_ITEM', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } });
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: productId });
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {state.items.map(item => (
              <li key={item.productId} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₹{item.price}</span>
                  <input
                    type="number"
                    className="item-quantity"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                  />
                  <button className="remove-button" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: </span>
            <span>₹{state.items.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
