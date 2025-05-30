const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Station = sequelize.define('Station', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -180,
      max: 180
    }
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
    defaultValue: 'available',
    allowNull: false
  },
  powerOutput: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  connectorType: {
    type: DataTypes.ENUM('Type1', 'Type2', 'CHAdeMO', 'CCS'),
    allowNull: false
  },
  lastMaintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  currentUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Station;
