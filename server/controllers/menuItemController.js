const { MenuItem, Category, MenuVariant, MenuIngredient } = require('../models/index.js');
const { Op } = require('sequelize');
const buildWhereClause = require('../utils/buildWhereClauseCategory.js');
const { buildFilters, buildIncludeOptions } = require('../utils/queryHelpers');

const searchMenuItems = async (req, res) => {
  try {
    const { keyword = '', limit = 10, page = 1 } = req.query;

    const { rows, count } = await MenuItem.findAndCountAll({
      where: {
        item_name: {
          [Op.like]: `%${keyword}%`
        }
      },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['item_name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search failed', error: error.message });
  }
};

const getFilteredMenuItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'DESC' } = req.query;

    const filters = buildFilters(req.query); 
    const whereClause = buildWhereClause(filters);
    const include = buildIncludeOptions(req.query);

    const offset = (page - 1) * limit;

    const { rows: menuItems, count } = await MenuItem.findAndCountAll({
      where: whereClause,
      include,
      limit: parseInt(limit),
      offset,
      order: [[sortBy, sortOrder.toUpperCase()]],
      distinct: true
    });

    res.status(200).json({
      success: true,
      data: menuItems,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      },
      filters: Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error filtering menu items', error: error.message });
  }
};


const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      order: [['menu_item_id', 'ASC']]
    });

    res.status(200).json({
      success: true,
      data: menuItems,
      count: menuItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching all menu items',
      error: error.message
    });
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { include_all } = req.query;

    const include = include_all === 'true' ? [
      { model: Category, as: 'category' },
      { model: MenuVariant, as: 'variants' },
      { model: MenuIngredient, as: 'menu_ingredients' }
    ] : [];

    const menuItem = await MenuItem.findByPk(id, { include });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu item', error: error.message });
  }
};


// Create new menu item
const createMenuItem = async (req, res) => {
    try {
        const menuItemData = req.body;
        
        // Basic validation
        if (!menuItemData.item_name) {
            return res.status(400).json({
                success: false,
                message: 'Item name is required'
            });
        }
        
        if (!menuItemData.category_id) {
            return res.status(400).json({
                success: false,
                message: 'Category ID is required'
            });
        }
        
        if (!menuItemData.price) {
            return res.status(400).json({
                success: false,
                message: 'Price is required'
            });
        }
        
        // Check if category exists
        const category = await Category.findByPk(menuItemData.category_id);
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            });
        }
        
        const newMenuItem = await MenuItem.create(menuItemData);
        
        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: newMenuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

// Update menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const menuItem = await MenuItem.findByPk(id);
        
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: `Menu item with ID ${id} not found`
            });
        }
        
        // Check if category exists (if updating category)
        if (updateData.category_id) {
            const category = await Category.findByPk(updateData.category_id);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }
        
        const updatedMenuItem = await menuItem.update(updateData);
        
        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: updatedMenuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        
        const menuItem = await MenuItem.findByPk(id);
        
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: `Menu item with ID ${id} not found`
            });
        }
        
        await menuItem.destroy();
        
        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};

// Get featured menu items
const getFeaturedMenuItems = async (req, res) => {
    try {
        const { limit = 10, include_category } = req.query;
        
        const include = [];
        if (include_category === 'true') {
            include.push({
                model: Category,
                as: 'category',
                attributes: ['category_id', 'category_name']
            });
        }
        
        const featuredItems = await MenuItem.findAll({
            where: { 
                is_featured: true,
                is_available: true 
            },
            include: include,
            limit: parseInt(limit),
            order: [['display_order', 'ASC']]
        });
        
        res.status(200).json({
            success: true,
            data: featuredItems,
            count: featuredItems.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching featured menu items',
            error: error.message
        });
    }
};

// Get menu items by category
const getMenuItemsByCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { include_variants, only_available } = req.query;
        
        const whereClause = { category_id };
        if (only_available === 'true') {
            whereClause.is_available = true;
        }
        
        const include = [];
        if (include_variants === 'true') {
            include.push({
                model: MenuVariant,
                as: 'variants',
                attributes: ['variant_id', 'variant_name', 'additional_price', 'is_available']
            });
        }
        
        const menuItems = await MenuItem.findAll({
            where: whereClause,
            include: include,
            order: [['display_order', 'ASC']]
        });
        
        res.status(200).json({
            success: true,
            data: menuItems,
            count: menuItems.length,
            category_id: parseInt(category_id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items by category',
            error: error.message
        });
    }
};

// Update menu item availability
const updateMenuItemAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_available } = req.body;
        
        if (typeof is_available !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'is_available must be a boolean value'
            });
        }
        
        const menuItem = await MenuItem.findByPk(id);
        
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: `Menu item with ID ${id} not found`
            });
        }
        
        await menuItem.update({ is_available });
        
        res.status(200).json({
            success: true,
            message: `Menu item ${is_available ? 'activated' : 'deactivated'} successfully`,
            data: {
                menu_item_id: menuItem.menu_item_id,
                item_name: menuItem.item_name,
                is_available: is_available
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating menu item availability',
            error: error.message
        });
    }
};

module.exports = {
    searchMenuItems,
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getFilteredMenuItems,
    getFeaturedMenuItems,
    getMenuItemsByCategory,
    updateMenuItemAvailability
};