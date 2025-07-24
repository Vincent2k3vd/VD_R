const buildFilters = (query) => {
  const {
    category_id,
    is_available,
    is_featured,
    search,
    price_min,
    price_max,
    calories_min,
    calories_max,
    prep_time_min,
    prep_time_max,
    allergens
  } = query;

  const filters = {
    category_id,
    is_available,
    is_featured,
    search
  };

  if (price_min || price_max) {
    filters.price = {};
    if (price_min) filters.price.min = parseFloat(price_min);
    if (price_max) filters.price.max = parseFloat(price_max);
  }

  if (calories_min || calories_max) {
    filters.calories = {};
    if (calories_min) filters.calories.min = parseInt(calories_min);
    if (calories_max) filters.calories.max = parseInt(calories_max);
  }

  if (prep_time_min || prep_time_max) {
    filters.preparation_time = {};
    if (prep_time_min) filters.preparation_time.min = parseInt(prep_time_min);
    if (prep_time_max) filters.preparation_time.max = parseInt(prep_time_max);
  }

  if (allergens) {
    filters.allergens = Array.isArray(allergens) ? allergens : allergens.split(',');
  }

  return filters;
};

const buildIncludeOptions = (query) => {
  const include = [];

  if (query.include_category === 'true') {
    include.push({
      model: require('../models/Category'),
      as: 'category',
      attributes: ['category_id', 'category_name']
    });
  }

  if (query.include_variants === 'true') {
    include.push({
      model: require('../models/MenuVariant'),
      as: 'variants',
      attributes: ['variant_id', 'variant_name', 'additional_price']
    });
  }

  if (query.include_ingredients === 'true') {
    include.push({
      model: require('../models/MenuIngredient'),
      as: 'menu_ingredients',
      attributes: ['ingredient_id', 'quantity', 'unit']
    });
  }

  return include;
};

module.exports = {
  buildFilters,
  buildIncludeOptions
};