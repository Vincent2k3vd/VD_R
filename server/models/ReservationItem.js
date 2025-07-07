
module.exports = (sequelize, DataTypes) => {
  const ReservationItem = sequelize.define("ReservationItem", {
    reservation_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservation_id: DataTypes.INTEGER,
    menu_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL(10, 2),
    total_price: DataTypes.DECIMAL(10, 2),
    special_instructions: DataTypes.TEXT
  }, {
    tableName: "reservation_items",
    timestamps: false,
  });

  ReservationItem.associate = (models) => {
    ReservationItem.belongsTo(models.TableReservation, {
      foreignKey: "reservation_id",
    });
    ReservationItem.belongsTo(models.MenuItem, {
      foreignKey: "menu_item_id",
    });
  };

  return ReservationItem;
};
