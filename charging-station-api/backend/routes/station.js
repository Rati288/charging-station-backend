const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const Station = require('../models/station.model');
const {
  getAllStations,
  getStation,
  createStation,
  updateStation,
  deleteStation
} = require('../controllers/station.controller');

// Get all stations
router.get('/', authenticateToken, getAllStations);

// Get a single station
router.get('/:id', authenticateToken, getStation);

// Create a new station
router.post('/', authenticateToken, createStation);

// Update a station
router.put('/:id', authenticateToken, updateStation);

// Delete a station
router.delete('/:id', authenticateToken, deleteStation);

// Book a station
router.post('/:id/book', authenticateToken, async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    if (station.status !== 'available') {
      return res.status(400).json({ error: 'Station is not available' });
    }

    await station.update({
      status: 'occupied',
      currentUser: req.user.userId
    });

    res.json(station);
  } catch (error) {
    console.error('Error booking station:', error);
    res.status(500).json({ 
      error: 'Failed to book station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Release a station
router.post('/:id/release', authenticateToken, async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    if (station.status !== 'occupied') {
      return res.status(400).json({ error: 'Station is not occupied' });
    }

    if (station.currentUser !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to release this station' });
    }

    await station.update({
      status: 'available',
      currentUser: null
    });

    res.json(station);
  } catch (error) {
    console.error('Error releasing station:', error);
    res.status(500).json({ 
      error: 'Failed to release station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
