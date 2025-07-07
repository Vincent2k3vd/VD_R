const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Table = sequelize.define('Table', {
    table_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    table_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    table_type: {
      type: DataTypes.ENUM("regular", "vip", "outdoor", "private"),
      allowNull: false,
      defaultValue: "regular",
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "reserved", "unavailable"),
      allowNull: false,
      defaultValue: "available",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'tables',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Table.associate = (models) => {
    Table.hasMany(models.Order, {
      foreignKey: 'table_id',
      as: 'orders'
    });
  };

  return Table;
};
