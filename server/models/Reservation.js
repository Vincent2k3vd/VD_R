// models/reservation.js
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reservation_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guest_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
      defaultValue: "pending",
    },
    special_requests: {
      type: DataTypes.TEXT,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: "reservations",
    timestamps: false,
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    Reservation.belongsToMany(models.Table, {
      through: models.ReservationTable,
      foreignKey: 'reservation_id',
      otherKey: 'table_id',
      as: 'tables'
    });

    Reservation.hasMany(models.ReservationItem, {
      foreignKey: 'reservation_id',
      as: 'items'
    });
  };



  return Reservation;
};
