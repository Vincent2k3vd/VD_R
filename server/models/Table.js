const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Table = sequelize.define('Table', {
    table_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    table_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available', 'occupied', 'reserved', 'maintenance'),
      defaultValue: 'available'
    },
    qr_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Table.associate = (models) => {
    Table.hasMany(models.Order, {
      foreignKey: 'table_id',
      as: 'orders'
    });
  };

  return Table;
};