/**
 * User Routes
 * -------------------------------------
 * Định nghĩa các endpoint liên quan đến người dùng trong hệ thống.
 * Mỗi route được bảo vệ bởi middleware xác thực (verifyToken) và phân quyền (verifyRole nếu cần).
 * -------------------------------------
 * Các quyền vai trò:
 *  - customer: Người dùng thông thường
 *  - employee: Nhân viên hệ thống
 *  - admin: Quản trị viên
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyRole = require('../middlewares/verifyRole');
const verifyToken = require('../middlewares/verifyToken');
const upload = require("../middlewares/uploadMiddleware");

/**
 * @route   GET /api/users/
 * @desc    Lấy danh sách tất cả người dùng (Chỉ employee/admin)
 * @access  Private (employee, admin)
 */
router.get('/', verifyToken, verifyRole([2, 1]), userController.getAllUsers);

/**
 * @route   GET /users/profile
 * @desc    Lấy thông tin hồ sơ người dùng
 * @access  Private
 */
router.get('/profile', verifyToken, userController.getProfile);

/**
 * @route   GET /api/users/:id
 * @desc    Lấy thông tin người dùng theo ID
 * @access  Private (chính chủ hoặc bất kỳ người đã xác thực)
 */
router.get('/:id', verifyToken, userController.getUserById);

/**
 * @route   PUT /api/users/me
 * @desc    Cập nhật thông tin cá nhân của người dùng hiện tại
 * @access  Private (chính chủ)
 */
router.put('/', verifyToken, userController.updateProfile);

/**
 * @route   PUT /api/users/me/password
 * @desc    Thay đổi mật khẩu của người dùng hiện tại
 * @access  Private (chính chủ)
 */
router.put('/me/password', verifyToken, userController.changePassword);

/**
 * @route   PUT /api/users/:id/role
 * @desc    Cập nhật vai trò của người dùng (employee hoặc admin)
 * @access  Private (employee, admin)
 */
router.patch('/:id/role', verifyToken, verifyRole([2, 1]), userController.updateUserRole);

/**
 * @route   DELETE /api/users/:id
 * @desc    Xóa người dùng khỏi hệ thống
 * @access  Private (employee, admin)
 */
router.delete('/:id', verifyToken, verifyRole([2, 1]), userController.deleteUser);

router.patch("/avatar", verifyToken, upload.single("avatar"), userController.updateAvatar);

module.exports = router;
