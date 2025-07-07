module.exports = (sequelize, DataTypes) => {
  const TableReservation = sequelize.define("TableReservation", {
    reservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    table_id: DataTypes.INTEGER,
    reservation_date: DataTypes.DATEONLY,
    reservation_time: DataTypes.STRING,
    guest_count: DataTypes.INTEGER,
    status: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    special_requests: DataTypes.TEXT,
    total_amount: DataTypes.DECIMAL(10, 2),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: "table_reservations",
    timestamps: false,
  });

  TableReservation.associate = (models) => {
    TableReservation.belongsTo(models.User, { foreignKey: "user_id" });
    TableReservation.belongsTo(models.Table, { foreignKey: "table_id" });
    TableReservation.hasMany(models.ReservationItem, {
      foreignKey: "reservation_id",
      as: "items",
    });
  };

  return TableReservation;
};
