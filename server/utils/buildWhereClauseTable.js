const { Op } = require("sequelize");

const buildWhereClause = (filters) => {
  const where = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.type) {
    where.table_type = filters.type;
  }

  if (filters.location) {
    where.location = filters.location;
  }

  if (filters.capacity) {
    const capacity = parseInt(filters.capacity);
    if (!isNaN(capacity)) {
      where.capacity = { [Op.gte]: capacity };
    }
  }

  return where;
};

module.exports = buildWhereClause;
