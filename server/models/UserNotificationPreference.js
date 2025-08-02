module.exports = (sequelize, DataTypes) => {
  const UserNotificationPreference = sequelize.define('UserNotificationPreference', {
    preference_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notification_type: {
      type: DataTypes.ENUM(
        'order_status', 'delivery_update', 'promotion', 'system_alert',
        'payment_status', 'inventory_alert', 'review_request', 'marketing',
        'staff_assignment', 'table_ready', 'kitchen_alert', 'customer_service'
      ),
      allowNull: false,
    },
    in_app_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sms_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    push_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    priority_filter: {
      type: DataTypes.ENUM('all', 'normal_and_above', 'high_and_above', 'urgent_only'),
      defaultValue: 'all',
    },
    quiet_hours_start: DataTypes.TIME,
    quiet_hours_end: DataTypes.TIME,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'user_notification_preferences',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'], name: 'idx_preferences_user' }
    ],
    uniqueKeys: {
      unique_user_notification_type: {
        fields: ['user_id', 'notification_type']
      }
    }
  });

  UserNotificationPreference.associate = models => {
    UserNotificationPreference.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return UserNotificationPreference;
};