const { Op } = require("sequelize");

const buildWhereClause = (filters) => {
  const where = {};

  if (filters.status) where.status = filters.status;
  if (filters.type) where.table_type = filters.type;
  if (filters.location) where.location = filters.location;

  // Chỉ tìm bàn có sức chứa >= capacity
  if (filters.capacity) {
    where.capacity = {
      [Op.gte]: parseInt(filters.capacity)
    };
  }

  return where;
};

module.exports = buildWhereClause;
