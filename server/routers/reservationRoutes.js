const express = require('express');
const router = express.Router();

// Import controller
const reservationController = require('../controllers/reservationController');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');

/**
 * @route GET /reservations/availability
 * @desc Kiểm tra tình trạng bàn trống theo ngày, giờ, số lượng khách
 * @access Private (có token)
 */
router.get('/availability', verifyToken, reservationController.checkTableAvailability);

/**
 * @route GET /reservations/user/:user_id
 * @desc Lấy danh sách đặt bàn của người dùng
 * @access Private (user hoặc admin)
 */
router.get('/user/:user_id', verifyToken, reservationController.getUserReservations);

/**
 * @route GET /reservations
 * @desc Lấy tất cả đơn đặt bàn (hỗ trợ lọc, phân trang)
 * @access Private (admin hoặc nhân viên)
 */
router.get('/', verifyToken, verifyRole([2, 1]), reservationController.getReservations);

/**
 * @route GET /reservations/:id
 * @desc Lấy chi tiết đơn đặt bàn theo ID
 * @access Private (user hoặc admin)
 */
router.get('/:id', verifyToken, verifyRole([2, 1]), reservationController.getReservationById);

/**
 * @route POST /reservations
 * @desc Tạo mới đơn đặt bàn
 * @access Private (user đã đăng nhập)
 */
router.post('/', verifyToken, reservationController.createReservation);

/**
 * @route PUT /reservations/:id
 * @desc Cập nhật thông tin đơn đặt bàn
 * @access Private (admin hoặc user)
 */
router.put('/:id', verifyToken, reservationController.updateReservation);

/**
 * @route PATCH /reservations/:id/status
 * @desc Cập nhật trạng thái đơn (pending, confirmed, cancelled, completed)
 * @access Private (admin hoặc nhân viên)
 */
router.patch('/:id/status', verifyToken, verifyRole([2, 1]), reservationController.updateReservationStatus);

/**
 * @route DELETE /reservations/:id
 * @desc Xoá đơn đặt bàn
 * @access Private (admin hoặc user tạo đơn)
 */
router.delete('/:id', verifyToken, verifyRole([2, 1]), reservationController.deleteReservation);

module.exports = router;
