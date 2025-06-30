const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderPromotion = sequelize.define('OrderPromotion', {
    order_promotion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    applied_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'order_promotions',
    timestamps: false
  });

  OrderPromotion.associate = (models) => {
    OrderPromotion.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order'
    });
    OrderPromotion.belongsTo(models.Promotion, {
      foreignKey: 'promotion_id',
      as: 'promotion'
    });
  };

  return OrderPromotion;
};