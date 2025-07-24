const express = require('express');
const router = express.Router();
const {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getFeaturedMenuItems,
    getMenuItemsByCategory,
    updateMenuItemAvailability
} = require('../controllers/menuItemController');

// GET /api/menu-items - Get all menu items with filtering, pagination, sorting
router.get('/', getAllMenuItems);

// GET /api/menu-items/featured - Get featured menu items
router.get('/featured', getFeaturedMenuItems);

// GET /api/menu-items/category/:category_id - Get menu items by category
router.get('/category/:category_id', getMenuItemsByCategory);

// GET /api/menu-items/:id - Get specific menu item by ID
router.get('/:id', getMenuItemById);

// POST /api/menu-items - Create new menu item
router.post('/', createMenuItem);

// PUT /api/menu-items/:id - Update menu item
router.put('/:id', updateMenuItem);

// PATCH /api/menu-items/:id/availability - Update menu item availability
router.patch('/:id/availability', updateMenuItemAvailability);

// DELETE /api/menu-items/:id - Delete menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;