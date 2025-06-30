const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Promotion = sequelize.define('Promotion', {
    promotion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    promotion_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discount_type: {
      type: DataTypes.ENUM('percentage', 'fixed_amount', 'free_item'),
      allowNull: false
    },
    discount_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    min_order_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    max_discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    applicable_to: {
      type: DataTypes.ENUM('all', 'dine-in', 'delivery'),
      defaultValue: 'all'
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    used_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'promotions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Promotion.associate = (models) => {
    Promotion.hasMany(models.OrderPromotion, {
      foreignKey: 'promotion_id',
      as: 'orderPromotions'
    });
  };

  return Promotion;
};