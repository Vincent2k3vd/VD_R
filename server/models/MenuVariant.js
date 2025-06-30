const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MenuVariant = sequelize.define('MenuVariant', {
    variant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    variant_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price_adjustment: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'menu_variants',
    timestamps: false
  });

  MenuVariant.associate = (models) => {
    MenuVariant.belongsTo(models.MenuItem, {
      foreignKey: 'item_id',
      as: 'menuItem'
    });
    MenuVariant.hasMany(models.OrderItem, {
      foreignKey: 'variant_id',
      as: 'orderItems'
    });
  };

  return MenuVariant;
};