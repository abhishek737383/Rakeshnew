import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitPaymentDetails } from '../api/PaymentService';
import { fetchBillDetails } from '../api/BillService';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/OrderService'; // Import your order creation function
import '../styles/PaymentPage.css';

const BASE_URL = 'https://newsite-1caa.onrender.com'; // Define your base URL here

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user details from AuthContext
  const { dispatch } = useCart();

  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: '',
    screenshot: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded

    const loadBillDetails = async () => {
      try {
        const details = await fetchBillDetails();
        if (Array.isArray(details) && details.length > 0) {
          const firstBill = details[0];
          if (firstBill.upiId && firstBill.qrCode) {
            setUpiId(firstBill.upiId);
    
            // Generate QR code URL based on the backend path
            const qrCodeUrl = firstBill.qrCode.includes('\\')
              ? `${BASE_URL}/uploads/payment/${firstBill.qrCode.split('\\').pop()}`
              : `${BASE_URL}${firstBill.qrCode}`;
    
            setQrCodeImageUrl(qrCodeUrl);
          } else {
            alert('Failed to load bill details. Please try again.');
          }
        } else {
          alert('No bill details found. Please try again.');
        }
      } catch (error) {
        alert('Error fetching bill details. Please try again.');
      }
    };
    
    loadBillDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setPaymentDetails({ ...paymentDetails, screenshot: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.transactionId) newErrors.transactionId = 'Transaction ID is required';
    if (!paymentDetails.screenshot) newErrors.screenshot = 'Payment screenshot is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to proceed.');
      navigate('/login');
      return;
    }

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('user', user.name);
    formData.append('transactionId', paymentDetails.transactionId);
    formData.append('screenshot', paymentDetails.screenshot);
    formData.append('upiId', upiId);

    try {
      setIsLoading(true);
      const paymentResponse = await submitPaymentDetails(formData);

      if (paymentResponse.success) {
        alert('Payment submitted successfully!');

        // Fetch the order and courier details from localStorage
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};
        const cartItems = orderDetails.cartItems || [];
        const courierDetails = orderDetails.courierDetails || {};

        if (cartItems.length === 0) {
          throw new Error('Cart items are required.');
        }

        const order = {
          userId: user.userId,
          cartItems,
          courierDetails,
        };

        // Create the order after payment success
        await createOrder(order);
        
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cartItems'); // Clear the cart from localStorage
        navigate('/thank-you');
      } else {
        alert('Payment failed: ' + (paymentResponse.message || 'Unknown error'));
      }
    } catch (error) {
      alert('An error occurred: ' + (error.message || 'Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId)
      .then(() => {
        alert('UPI ID copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy UPI ID. Please try again.');
      });
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>

      {/* Step 1: UPI Payment */}
      <div className="payment-instructions">
        <h2>Step 1: Make Payment via UPI</h2>
        <p>Use the UPI ID or scan the QR code to make your payment.</p>
        {upiId ? (
          <p>
            UPI ID: <strong>{upiId}</strong>
            <button onClick={copyToClipboard} style={{ marginLeft: '10px' }}>
              Copy UPI ID
            </button>
          </p>
        ) : (
          <p>Loading UPI ID...</p>
        )}
        {qrCodeImageUrl ? (
          <img src={qrCodeImageUrl} alt="QR Code" className="qr-code" />
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>

      {/* Step 2: Enter Transaction ID */}
      <form onSubmit={handleSubmit}>
        <div className="transaction-section">
          <h2>Step 2: Enter Transaction ID</h2>
          <p>Once you've made the payment, enter the transaction ID you received.</p>
          <label>Transaction ID:</label>
          <input
            type="text"
            name="transactionId"
            value={paymentDetails.transactionId}
            onChange={handleInputChange}
            required
          />
          {errors.transactionId && <span className="error">{errors.transactionId}</span>}
        </div>

        {/* Step 3: Upload Screenshot */}
        <div className="screenshot-section">
          <h2>Step 3: Upload Payment Screenshot</h2>
          <p>Upload a screenshot as proof of your successful payment.</p>
          <label>Payment Screenshot:</label>
          <input
            type="file"
            name="screenshot"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {errors.screenshot && <span className="error">{errors.screenshot}</span>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>

      {/* Step 4: Confirmation */}
      <div className="confirmation-section">
        <h2>Step 4: Confirmation</h2>
        <p>Once the payment is verified, your order will be processed </p>
      </div>

      {/* Display User Information */}
      <div className="user-info">
        <h3>User Information</h3>
        <p><strong>User Name:</strong> {user.name}</p> {/* Display the user's name */}
      </div>
    </div>
  );
};

export default PaymentPage; 