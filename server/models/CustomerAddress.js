const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CustomerAddress = sequelize.define('CustomerAddress', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address_type: {
      type: DataTypes.ENUM('home', 'work', 'other'),
      defaultValue: 'home'
    },
    street_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ward: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'customer_addresses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  CustomerAddress.associate = (models) => {
    CustomerAddress.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    CustomerAddress.hasMany(models.Order, {
      foreignKey: 'delivery_address_id',
      as: 'orders'
    });
  };

  return CustomerAddress;
};