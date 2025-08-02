const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DeliveryStaff = sequelize.define('DeliveryStaff', {
    staff_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicle_type: {
      type: DataTypes.ENUM('motorbike', 'bicycle', 'car'),
      allowNull: false
    },
    license_plate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    current_location_lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    current_location_lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    }
  }, {
    tableName: 'delivery_staff',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  DeliveryStaff.associate = (models) => {
    DeliveryStaff.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    DeliveryStaff.hasMany(models.DeliveryAssignment, {
      foreignKey: 'staff_id',
      as: 'deliveryAssignments'
    });
  };

  return DeliveryStaff;
};