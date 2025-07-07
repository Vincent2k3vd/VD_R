const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Inventory = sequelize.define('Inventory', {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    current_stock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    min_stock_level: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    max_stock_level: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    unit_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    supplier: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    last_restocked: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'inventory',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  // 👇 Chỉ cần định nghĩa Inventory.associate
  Inventory.associate = (models) => {
    Inventory.hasMany(models.MenuIngredient, {
      foreignKey: 'inventory_id',
      as: 'used_in_items',
    });
  };

  return Inventory;
};
