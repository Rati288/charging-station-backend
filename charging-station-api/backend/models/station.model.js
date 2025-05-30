module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define('Station', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
      defaultValue: 'available',
    },
    power_output: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 7.4, // Default 7.4kW for Type 2 chargers
    },
    last_maintenance: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    tableName: 'stations',
    timestamps: true,
  });

  return Station;
};
