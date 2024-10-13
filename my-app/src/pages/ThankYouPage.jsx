import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import '../styles/ThankYouPage.css'; // Create a CSS file for styling

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Redirect to the home page or product listing page
  };

  const handleViewOrders = () => {
    navigate('/my-orders'); // Redirect to My Orders page
  };

  return (
    <div className="thank-you-page">
      <div className="thank-you-page__container">
        <h1 className="thank-you-page__title">Thank You!</h1>
        <p className="thank-you-page__message">Your order has been placed successfully.</p>
        <div className="thank-you-page__buttons">
          <button onClick={handleContinueShopping} className="continue-shopping-button">
            <FontAwesomeIcon icon={faShoppingCart} className="button-icon" /> Continue Shopping
          </button>
          <button onClick={handleViewOrders} className="view-orders-button">
            <FontAwesomeIcon icon={faClipboardList} className="button-icon" /> View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
