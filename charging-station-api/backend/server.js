// server.js
const express = require('express');
const helmet = require('helmet');
const apiLimiter = require('./middleware/rateLimit');
const sanitizeMiddleware = require('./middleware/sanitize');
require('dotenv').config();

const app = express();

// Middlewares
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON request bodies
app.use(sanitizeMiddleware); // Sanitize input data
app.use('/api/', apiLimiter); // Apply rate limiting to all /api routes

// Import routes
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const stationRoutes = require('./routes/station');

// Use routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/stations', stationRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Charging Station API');
});

// Handle 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
