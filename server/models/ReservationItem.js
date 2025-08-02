module.exports = (sequelize, DataTypes) => {
  const ReservationItem = sequelize.define('ReservationItem', {
    reservation_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    special_instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'reservation_items',
    timestamps: false
  });

  ReservationItem.associate = (models) => {
    ReservationItem.belongsTo(models.Reservation, {
      foreignKey: 'reservation_id',
      as: 'reservation'
    });

    ReservationItem.belongsTo(models.MenuItem, {
      foreignKey: 'menu_item_id',
      as: 'menuItem'
    });

  };


  return ReservationItem;
};
