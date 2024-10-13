import React, { useState, useEffect } from 'react';
import { fetchBillDetails, uploadBillDetails } from '../../api/BillService';
import { fetchPayments, deletePayment } from '../../api/PaymentService';
import '../adminStyle/Adminbill.css'; // Import CSS file for styling

const BASE_URL = 'https://newsite-1caa.onrender.com';

const AdminBillPage = () => {
  const [billDetails, setBillDetails] = useState({ upiId: '', qrCode: '' });
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const details = await fetchBillDetails();
        setBillDetails(details);
      } catch (error) {
        console.error('Error fetching bill details:', error);
        alert('Failed to load bill details. Please check your server.');
      }
    };

    const loadPayments = async () => {
      try {
        const allPayments = await fetchPayments();
        setPayments(allPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        alert('Failed to load payments. Please check your server.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
    loadPayments();
  }, []);

  const handleFileChange = (e) => {
    setQrCodeFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillDetails({ ...billDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('upiId', billDetails.upiId);
    formData.append('qrCode', qrCodeFile);

    try {
      await uploadBillDetails(formData);
      alert('Bill details updated successfully');
      await fetchPayments(); // Re-fetch payments after successful upload
      setQrCodeFile(null);
    } catch (error) {
      console.error('Error uploading bill details:', error);
      alert('Failed to upload bill details');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      try {
        await deletePayment(paymentId);
        alert('Payment record deleted successfully');
        setPayments(payments.filter(payment => payment._id !== paymentId));
      } catch (error) {
        console.error('Error deleting payment record:', error);
        alert('Failed to delete payment record');
      }
    }
  };

  return (
    <div className="admin-bill-container">
      <h1 className="admin-bill-title">Admin Bill Management</h1>
      <form className="bill-form" onSubmit={handleSubmit}>
        <label>UPI ID:</label>
        <input
          type="text"
          name="upiId"
          value={billDetails.upiId}
          onChange={handleInputChange}
          required
          className="upi-input"
        />

        <label>QR Code:</label>
        <input
          type="file"
          name="qrCode"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="qr-input"
        />
        <button type="submit" className="btn-submit">Upload Bill Details</button>
      </form>

      <h2 className="payments-title">Payment Records</h2>
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="payments-table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Transaction ID</th>
                <th>Screenshot</th>
                <th>Download</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.user}</td>
                    <td>{payment.transactionId}</td>
                    <td>
                      <img
                        src={`${BASE_URL}/uploads/screenshots/${payment.screenshot}`}
                        alt="Screenshot"
                        className="payment-screenshot"
                      />
                    </td>
                    <td>
                      <a
                        href={`${BASE_URL}/uploads/screenshots/${payment.screenshot}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-download"
                      >
                        Download
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeletePayment(payment._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No payment records available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBillPage;
