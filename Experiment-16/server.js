// Experiment 16 - Middleware Implementation
const express = require('express');
const app = express();
const PORT = 3000;

// Logging Middleware (Global)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
});

// Authentication Middleware (For Protected Route)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('Access Denied: Missing Authorization header');
        return res
            .status(401)
            .json({ message: 'Authorization header missing or incorrect' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer mysecrettoken"

    if (token !== 'mysecrettoken') {
        console.log(' Access Denied: Invalid token');
        return res.status(403).json({ message: 'Invalid token' });
    }

    console.log(' Access Granted: Valid token');
    next(); // Token is valid → continue to the protected route
}

// Routes

// Public Route - No Authentication Needed
app.get('/public', (req, res) => {
    res.send('This is a public route. No authentication required.');
});

// Protected Route - Authentication Required
app.get('/protected', authenticateToken, (req, res) => {
    res.send('You have accessed a protected route with a valid Bearer token!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
