module.exports = (sequelize, DataTypes) => {
  const NotificationTemplate = sequelize.define('NotificationTemplate', {
    template_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    template_key: {
      type: DataTypes.STRING(100),
      unique: true,
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
    language: {
      type: DataTypes.STRING(5),
      defaultValue: 'vi',
    },
    title_template: DataTypes.STRING(200),
    message_template: DataTypes.TEXT,
    email_subject_template: DataTypes.STRING(200),
    email_body_template: DataTypes.TEXT,
    sms_template: DataTypes.STRING(160),
    push_title_template: DataTypes.STRING(100),
    push_body_template: DataTypes.STRING(200),
    variables: DataTypes.JSON,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'notification_templates',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['template_key'], name: 'idx_templates_key' },
      { fields: ['notification_type'], name: 'idx_templates_type' }
    ]
  });

  return NotificationTemplate;
};
