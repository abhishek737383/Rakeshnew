import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/CheckoutPage.css'; // Updated CSS import

const CheckoutPage = () => {
  const { state: cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courierDetails, setCourierDetails] = useState({
    fullName: '',
    contactNo: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    size: '',
    quantity: 1,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourierDetails({
      ...courierDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { fullName, contactNo, city, state, pincode, address, size } = courierDetails;

    if (!fullName || fullName.length < 2) newErrors.fullName = 'Full Name must be at least 2 characters long';
    if (!contactNo) newErrors.contactNo = 'Contact No is required';
    if (!city || city.length < 2) newErrors.city = 'City must be at least 2 characters long';
    if (!state || state.length < 2) newErrors.state = 'State must be at least 2 characters long';
    if (!pincode) newErrors.pincode = 'Pincode is required';
    if (!address || address.length < 5) newErrors.address = 'Full Address must be at least 5 characters long';
    if (!size) newErrors.size = 'Size is required';

    if (contactNo && !/^\d{10}$/.test(contactNo)) newErrors.contactNo = 'Contact No must be a 10-digit number';
    if (pincode && !/^\d{6}$/.test(pincode)) newErrors.pincode = 'Pincode must be a 6-digit number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to place an order.');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    const updatedCourierDetails = { ...courierDetails };

    try {
      const order = {
        userId: user.userId,
        cartItems: cartItems.items,
        courierDetails: updatedCourierDetails,
      };

      localStorage.setItem('orderDetails', JSON.stringify(order));
      localStorage.setItem('courierDetails', JSON.stringify(updatedCourierDetails));

      alert('Order details prepared successfully! Proceed to payment.');
      navigate('/payment');
    } catch (error) {
      console.error('Order submission failed', error);
      alert('Failed to prepare order details. Please try again.');
    }
  };

  return (
    <div className="premium-checkout-container">
      <h1 className="premium-checkout-heading">Checkout</h1>

      {user ? (
        <div className="premium-user-details">
          <h2>User Information</h2>
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
        </div>
      ) : (
        <p>No user is logged in.</p>
      )}

      {cartItems.items.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before proceeding.</p>
      ) : (
        <>
          <h2>Your Cart Items:</h2>
          <ul className="premium-cart-list">
            {cartItems.items.map((item) => (
              <li key={item.productId} className="premium-cart-item">
                <img src={item.image} alt={item.name} className="premium-cart-item-image" />
                <div className="premium-cart-item-info">
                  <span>{item.name}</span>
                  <span> - ₹{item.price} x {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="premium-form">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={courierDetails.fullName}
              onChange={handleInputChange}
              required
              className="premium-input-field"
            />
            {errors.fullName && <span className="premium-error-message">{errors.fullName}</span>}

            <label>Contact No:</label>
            <input
              type="text"
              name="contactNo"
              value={courierDetails.contactNo}
              onChange={handleInputChange}
              required
              className="premium-input-field"
            />
            {errors.contactNo && <span className="premium-error-message">{errors.contactNo}</span>}

            <label>City:</label>
            <input
              type="text"
              name="city"
              value={courierDetails.city}
              onChange={handleInputChange}
              required
              className="premium-input-field"
            />
            {errors.city && <span className="premium-error-message">{errors.city}</span>}

            <label>State:</label>
            <input
              type="text"
              name="state"
              value={courierDetails.state}
              onChange={handleInputChange}
              required
              className="premium-input-field"
            />
            {errors.state && <span className="premium-error-message">{errors.state}</span>}

            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={courierDetails.pincode}
              onChange={handleInputChange}
              required
              className="premium-input-field"
            />
            {errors.pincode && <span className="premium-error-message">{errors.pincode}</span>}

            <label>Full Address:</label>
            <textarea
              name="address"
              value={courierDetails.address}
              onChange={handleInputChange}
              required
              className="premium-textarea-field"
            />
            {errors.address && <span className="premium-error-message">{errors.address}</span>}

            <label>Size (e.g., M or L or 6,7):</label>
            <input
              type="text"
              name="size"
              value={courierDetails.size}
              onChange={handleInputChange}
              required
              className="premium-input-field"
              placeholder="Enter size (your product size etc.)"
            />
            {errors.size && <span className="premium-error-message">{errors.size}</span>}

            <button type="submit" className="premium-submit-btn">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
