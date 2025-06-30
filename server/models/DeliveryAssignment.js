const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DeliveryAssignment = sequelize.define('DeliveryAssignment', {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assigned_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    picked_up_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('assigned', 'picked_up', 'in_transit', 'delivered', 'failed'),
      defaultValue: 'assigned'
    },
    delivery_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'delivery_assignments',
    timestamps: false
  });

  DeliveryAssignment.associate = (models) => {
    DeliveryAssignment.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
    DeliveryAssignment.belongsTo(models.DeliveryStaff, {
      foreignKey: 'staff_id',
      as: 'deliveryStaff'
    });
  };

  return DeliveryAssignment;
};