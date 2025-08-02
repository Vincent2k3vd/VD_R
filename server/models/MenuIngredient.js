const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MenuIngredient = sequelize.define('MenuIngredient', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_required: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'menu_ingredients',
    timestamps: false,
  });

  // Định nghĩa liên kết với các model khác
  MenuIngredient.associate = (models) => {
    MenuIngredient.belongsTo(models.MenuItem, {
      foreignKey: 'menu_item_id',
      as: 'menuItem',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    MenuIngredient.belongsTo(models.Inventory, {
      foreignKey: 'inventory_id',
      as: 'ingredient',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return MenuIngredient;
};
