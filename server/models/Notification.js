module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notification_type: {
      type: DataTypes.ENUM(
        'order_status', 'delivery_update', 'promotion', 'system_alert',
        'payment_status', 'inventory_alert', 'review_request', 'marketing',
        'staff_assignment', 'table_ready', 'kitchen_alert', 'customer_service'
      ),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
      defaultValue: 'normal',
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    related_order_id: DataTypes.INTEGER,
    related_table_id: DataTypes.INTEGER,
    related_item_id: DataTypes.INTEGER,
    action_url: DataTypes.STRING(500),
    image_url: DataTypes.STRING(500),
    expires_at: DataTypes.DATE,
    is_system_generated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      { fields: ['notification_type'], name: 'idx_notifications_type' },
      { fields: ['priority'], name: 'idx_notifications_priority' },
      { fields: ['created_at'], name: 'idx_notifications_created' },
      { fields: ['expires_at'], name: 'idx_notifications_expires' },
    ]
  });

  Notification.associate = models => {
    Notification.belongsTo(models.User, { foreignKey: 'sender_id', onDelete: 'SET NULL' });
    Notification.belongsTo(models.Order, { foreignKey: 'related_order_id', onDelete: 'CASCADE' });
    Notification.belongsTo(models.Table, { foreignKey: 'related_table_id', onDelete: 'SET NULL' });
    Notification.belongsTo(models.MenuItem, { foreignKey: 'related_item_id', onDelete: 'SET NULL' });
    Notification.hasMany(models.NotificationRecipient, { foreignKey: 'notification_id', onDelete: 'CASCADE' });
  };

  return Notification;
};