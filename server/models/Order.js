const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_type: {
      type: DataTypes.ENUM('dine-in', 'delivery'),
      allowNull: false
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    delivery_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    payment_method: {
      type: DataTypes.ENUM('cash', 'card', 'momo', 'zalopay', 'banking'),
      defaultValue: 'cash'
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    tax_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    special_instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estimated_delivery_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actual_delivery_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    customer_phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Order.belongsTo(models.Table, {
      foreignKey: 'table_id',
      as: 'table'
    });
    Order.belongsTo(models.CustomerAddress, {
      foreignKey: 'delivery_address_id',
      as: 'deliveryAddress'
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems'
    });
    Order.hasMany(models.OrderPromotion, {
      foreignKey: 'order_id',
      as: 'orderPromotions'
    });
    Order.hasOne(models.DeliveryAssignment, {
      foreignKey: 'order_id',
      as: 'deliveryAssignment'
    });
    Order.hasMany(models.Review, {
      foreignKey: 'order_id',
      as: 'reviews'
    });
  };

  return Order;
};