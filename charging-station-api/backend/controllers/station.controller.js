const Station = require('../models/station.model');

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.findAll({
      where: req.query.status ? { status: req.query.status } : undefined
    });
    res.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch stations',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getStation = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    console.error('Error fetching station:', error);
    res.status(500).json({ 
      error: 'Failed to fetch station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.createStation = async (req, res) => {
  try {
    const { name, latitude, longitude, powerOutput, connectorType } = req.body;
    
    // Basic validation
    if (!name || !latitude || !longitude || !powerOutput || !connectorType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const station = await Station.create(req.body);
    res.status(201).json(station);
  } catch (error) {
    console.error('Error creating station:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ 
      error: 'Failed to create station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    // If status is being updated to maintenance, record the timestamp
    if (req.body.status === 'maintenance') {
      req.body.lastMaintenance = new Date();
    }

    await station.update(req.body);
    res.json(station);
  } catch (error) {
    console.error('Error updating station:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ 
      error: 'Failed to update station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    await station.destroy();
    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error('Error deleting station:', error);
    res.status(500).json({ 
      error: 'Failed to delete station',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
