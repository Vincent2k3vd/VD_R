const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const verifyRole = require('../middlewares/verifyRole');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @route   GET /api/menu
 * @desc    Lọc món ăn nâng cao (dùng cho cả admin & public)
 * @access  Public
 */
router.get('/', menuItemController.getFilteredMenuItems);

/**
 * @route   GET /api/menu/search
 * @desc    Tìm kiếm món ăn theo tên
 * @access  Public
 */
router.get('/search', menuItemController.searchMenuItems);

/**
 * @route   GET /api/menu/all
 * @desc    Lấy tất cả món ăn (không phân trang, không include)
 * @access  Public
 */
router.get('/all', menuItemController.getAllMenuItems);

/**
 * @route   GET /api/menu/featured
 * @desc    Lấy danh sách món ăn nổi bật
 * @access  Public
 */
router.get('/featured', menuItemController.getFeaturedMenuItems);

/**
 * @route   GET /api/menu/category/:category_id
 * @desc    Lấy danh sách món ăn theo danh mục
 * @access  Public
 */
router.get('/category/:category_id', menuItemController.getMenuItemsByCategory);

/**
 * @route   GET /api/menu/:id
 * @desc    Lấy thông tin chi tiết món ăn theo ID
 * @access  Public
 */
router.get('/:id', menuItemController.getMenuItemById);

/**
 * @route   POST /api/menu
 * @desc    Thêm món ăn mới
 * @access  Private (admin, manager)
 */
router.post('/', verifyToken, verifyRole([1, 2]), menuItemController.createMenuItem);

/**
 * @route   PUT /api/menu/:id
 * @desc    Cập nhật thông tin món ăn
 * @access  Private (admin, manager)
 */
router.put('/:id', verifyToken, verifyRole([1, 2]), menuItemController.updateMenuItem);

/**
 * @route   PATCH /api/menu/:id/availability
 * @desc    Cập nhật trạng thái còn hàng của món ăn
 * @access  Private (admin, manager)
 */
router.patch('/:id/availability', verifyToken, verifyRole([1, 2]), menuItemController.updateMenuItemAvailability);

/**
 * @route   DELETE /api/menu/:id
 * @desc    Xoá món ăn khỏi hệ thống
 * @access  Private (admin, manager)
 */
router.delete('/:id', verifyToken, verifyRole([1, 2]), menuItemController.deleteMenuItem);

module.exports = router;
