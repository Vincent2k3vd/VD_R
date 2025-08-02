module.exports = (sequelize, DataTypes) => {
  const UserPushToken = sequelize.define('UserPushToken', {
    token_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    device_token: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    device_type: {
      type: DataTypes.ENUM('ios', 'android', 'web'),
      allowNull: false,
    },
    device_model: DataTypes.STRING(100),
    app_version: DataTypes.STRING(20),
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_used_at: DataTypes.DATE,
  }, {
    tableName: 'user_push_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      { fields: ['user_id'], name: 'idx_push_tokens_user' },
      { fields: ['is_active'], name: 'idx_push_tokens_active' }
    ],
    uniqueKeys: {
      unique_user_device_token: {
        fields: ['user_id', 'device_token']
      }
    }
  });

  UserPushToken.associate = models => {
    UserPushToken.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return UserPushToken;
};