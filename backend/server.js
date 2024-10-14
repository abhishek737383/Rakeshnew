// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet'); // Security middleware
const connectDB = require('./config/db'); // Path to your connectDB file
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const path = require('path'); // To serve static files
const sliderRoutes = require('./routes/sliderRoutes'); // Import slider routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
const cartRoutes = require('./routes/cartRoutes'); // Import cart routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const billRoutes = require('./routes/billRoutes'); // Import bill routes
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = ['https://kingproducts.netlify.app']; // Add your frontend domain

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Enable cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json()); // For parsing application/json

// Use routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/slider', sliderRoutes); // Slider routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/cart', cartRoutes); // Cart routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/bills', billRoutes); // Bill routes
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api/user', userRoutes); // User routes

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
