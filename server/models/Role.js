module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });

  Role.associate = models => {
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'users'
    });
  };

  return Role;
};
