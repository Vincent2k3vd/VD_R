const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SystemSetting = sequelize.define('SystemSetting', {
    setting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    setting_value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_type: {
      type: DataTypes.ENUM('string', 'number', 'boolean', 'json'),
      defaultValue: 'string'
    }
  }, {
    tableName: 'system_settings',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at'
  });

  return SystemSetting;
};