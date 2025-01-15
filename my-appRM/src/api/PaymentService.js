// src/api/PaymentService.js
import axios from 'axios';

const API_URL = 'https://rakeshnew.onrender.com/api/payments'; // Update with your backend URL

// Function to submit payment details
export const submitPaymentDetails = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Assuming your backend returns JSON data
    } catch (error) {
        console.error('Error submitting payment details:', error);
        throw error; // Rethrow error for handling in the component
    }
};

// Function to fetch all payments
export const fetchPayments = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`); // Adjust endpoint as necessary
        return response.data; // Assuming your backend returns an array of payments
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error; // Rethrow error for handling in the component
    }
};

// Function to delete a payment
export const deletePayment = async (paymentId) => {
    try {
        const response = await axios.delete(`${API_URL}/${paymentId}`); // DELETE request to delete the payment
        return response.data; // Assuming your backend returns a success message or relevant data
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error; // Rethrow error for handling in the component
    }
};
