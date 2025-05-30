const express = require('express');
const router = express.Router();
const { testConnection } = require('../models/index');

// Basic health check
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Detailed health check
router.get('/detailed', async (req, res) => {
  try {
    // Check database connection
    await testConnection();

    // Get memory usage
    const memoryUsage = process.memoryUsage();
    
    // Get uptime
    const uptime = process.uptime();

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: uptime,
      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100 + 'MB',
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100 + 'MB',
        rss: Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100 + 'MB'
      },
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Service unavailable',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 