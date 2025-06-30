module.exports = (sequelize, DataTypes) => {
  const NotificationRecipient = sequelize.define('NotificationRecipient', {
    recipient_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_method: {
      type: DataTypes.ENUM('in_app', 'email', 'sms', 'push', 'webhook'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'delivered', 'read', 'failed'),
      defaultValue: 'pending',
    },
    sent_at: DataTypes.DATE,
    read_at: DataTypes.DATE,
    failed_reason: DataTypes.STRING,
    retry_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    metadata: DataTypes.JSON,
  }, {
    tableName: 'notification_recipients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      { fields: ['user_id'], name: 'idx_recipients_user' },
      { fields: ['status'], name: 'idx_recipients_status' },
      { fields: ['delivery_method'], name: 'idx_recipients_method' },
    ],
    uniqueKeys: {
      unique_notification_user_method: {
        fields: ['notification_id', 'user_id', 'delivery_method']
      }
    }
  });

  NotificationRecipient.associate = models => {
    NotificationRecipient.belongsTo(models.Notification, { foreignKey: 'notification_id', onDelete: 'CASCADE' });
    NotificationRecipient.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return NotificationRecipient;
};