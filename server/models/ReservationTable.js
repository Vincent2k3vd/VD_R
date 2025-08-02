// models/reservation_table.js
module.exports = (sequelize, DataTypes) => {
  const ReservationTable = sequelize.define("ReservationTable", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "reservation_tables",
    timestamps: false,
  });
  
  ReservationTable.associate = (models) => {
    ReservationTable.belongsTo(models.Reservation, {
      foreignKey: 'reservation_id',
      as: 'reservation'
    });

    ReservationTable.belongsTo(models.Table, {
      foreignKey: 'table_id',
      as: 'table'
    });

  };

  return ReservationTable;
};
