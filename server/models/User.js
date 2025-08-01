module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    last_login_at: DataTypes.DATE
  }, {
    tableName: 'users',
    
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });

    User.hasMany(models.CustomerAddress, { foreignKey: 'user_id', as: 'addresses' });
    User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
    User.hasOne(models.DeliveryStaff, { foreignKey: 'user_id', as: 'deliveryStaff' });
    User.hasMany(models.Review, { foreignKey: 'user_id', as: 'reviews' });

    User.hasMany(models.Reservation, {
      foreignKey: 'user_id',
      as: 'reservations'
    });

  };

  return User;
};
