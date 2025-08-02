const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MenuItem = sequelize.define('MenuItem', {
    menu_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    preparation_time: {
      type: DataTypes.INTEGER,
      defaultValue: 15
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    allergens: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    onDelete: 'RESTRICT',
    tableName: 'menu_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Category, {
      foreignKey: 'category_id',
      onDelete: 'RESTRICT',
      as: 'category'
    });

    MenuItem.hasMany(models.MenuVariant, {
      foreignKey: 'item_id',
      as: 'variants'
    });

    MenuItem.hasMany(models.OrderItem, {
      foreignKey: 'item_id',
      as: 'orderItems'
    });

    MenuItem.hasMany(models.MenuIngredient, {
      foreignKey: 'menu_item_id',
      as: 'menu_ingredients',
    });
  };


  return MenuItem;
};