const { Op } = require('sequelize');

const buildWhereClause = (filters) => {
  const whereClause = {};
    
    // Basic filters
    if (filters.category_id) {
        whereClause.category_id = filters.category_id;
    }
    
    if (filters.is_available !== undefined) {
        whereClause.is_available = filters.is_available;
    }

    if (filters.is_featured !== undefined) {
        whereClause.is_featured = filters.is_featured;
    }

    
    // Price range filters
    if (filters.price) {
        if (filters.price.min && filters.price.max) {
            whereClause.price = {
                [Op.between]: [filters.price.min, filters.price.max]
            };
        } else if (filters.price.min) {
            whereClause.price = {
                [Op.gte]: filters.price.min
            };
        } else if (filters.price.max) {
            whereClause.price = {
                [Op.lte]: filters.price.max
            };
        }
    }
    
    // Calories range
    if (filters.calories) {
        if (filters.calories.min && filters.calories.max) {
            whereClause.calories = {
                [Op.between]: [filters.calories.min, filters.calories.max]
            };
        } else if (filters.calories.min) {
            whereClause.calories = {
                [Op.gte]: filters.calories.min
            };
        } else if (filters.calories.max) {
            whereClause.calories = {
                [Op.lte]: filters.calories.max
            };
        }
    }
    
    // Preparation time range
    if (filters.preparation_time) {
        if (filters.preparation_time.min && filters.preparation_time.max) {
            whereClause.preparation_time = {
                [Op.between]: [filters.preparation_time.min, filters.preparation_time.max]
            };
        } else if (filters.preparation_time.min) {
            whereClause.preparation_time = {
                [Op.gte]: filters.preparation_time.min
            };
        } else if (filters.preparation_time.max) {
            whereClause.preparation_time = {
                [Op.lte]: filters.preparation_time.max
            };
        }
    }
    
    // Text search
    const rawSearch = (filters.search || "").trim();
    if (rawSearch.length >= 2) {
        whereClause.item_name = { [Op.like]: `%${rawSearch}%` };
        }
    
    // Allergen filter
    if (filters.allergens && Array.isArray(filters.allergens)) {
        whereClause[Op.or] = filters.allergens.map(allergen => ({
            allergens: { [Op.Like]: `%${allergen}%` }
        }));
    }
    

  return whereClause;
};

module.exports = buildWhereClause;
