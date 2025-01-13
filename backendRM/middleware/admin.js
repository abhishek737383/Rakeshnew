// src/middleware/admin.js
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token.');

        // Assuming your user object contains a role field
        if (decoded.role !== 'admin') {
            return res.status(403).send('Not authorized as admin.');
        }

        req.user = decoded; // Attach user information to the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { verifyAdmin };

