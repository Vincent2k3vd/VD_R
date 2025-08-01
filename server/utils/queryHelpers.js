const Category = require('../models/Category');
const MenuVariant = require('../models/MenuVariant');
const MenuIngredient = require('../models/MenuIngredient');

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
    allergens,
  } = query;

  const filters = {};

  if (category_id) filters.category_id = category_id;

  if (is_available !== undefined) {
    filters.is_available = String(is_available).toLowerCase() === 'true';
  }

  if (is_featured !== undefined) {
    filters.is_featured = String(is_featured).toLowerCase() === 'true';
  }

  if (search) filters.search = search;

  // Price filter
  if (price_min || price_max) {
    const price = {};
    if (price_min) price.min = Number(price_min);
    if (price_max) price.max = Number(price_max);
    if (Object.keys(price).length) filters.price = price;
  }

  // Calories filter
  if (calories_min || calories_max) {
    const calories = {};
    if (calories_min) calories.min = Number(calories_min);
    if (calories_max) calories.max = Number(calories_max);
    if (Object.keys(calories).length) filters.calories = calories;
  }

  // Preparation time filter
  if (prep_time_min || prep_time_max) {
    const prepTime = {};
    if (prep_time_min) prepTime.min = Number(prep_time_min);
    if (prep_time_max) prepTime.max = Number(prep_time_max);
    if (Object.keys(prepTime).length) filters.preparation_time = prepTime;
  }

  // Allergens
  if (allergens) {
    filters.allergens = Array.isArray(allergens)
      ? allergens
      : allergens.split(',').map(item => item.trim());
  }

  return filters;
};

const buildIncludeOptions = (query) => {
  const include = [];

  if (query.include_category === 'true') {
    include.push({
      model: Category,
      as: 'category',
      attributes: ['category_id', 'category_name'],
    });
  }

  if (query.include_variants === 'true') {
    include.push({
      model: MenuVariant,
      as: 'variants',
      attributes: ['variant_id', 'variant_name', 'additional_price'],
    });
  }

  if (query.include_ingredients === 'true') {
    include.push({
      model: MenuIngredient,
      as: 'menu_ingredients',
      attributes: ['ingredient_id', 'quantity', 'unit'],
    });
  }

  return include;
};

module.exports = {
  buildFilters,
  buildIncludeOptions,
};
