const express = require('express');
const router = express.Router();

// Import controller
const {
  checkTableAvailability, 
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  getUserReservations,
  updateReservation,
  updateReservationStatus
} = require('../controllers/reservationController');

/**
 * @route GET /reservations/availability
 * @desc Kiểm tra tình trạng bàn trống theo ngày, giờ, số lượng khách
 * @access Public
 * @query { date, time, guestCount }
 * @returns {boolean} isAvailable, suggestedTables
 */
router.get('/availability', checkTableAvailability);

/**
 * @route POST /reservations
 * @desc Tạo một đơn đặt bàn mới
 * @access Public (hoặc Private nếu yêu cầu đăng nhập)
 * @body { user_id, table_id, date, time, guestCount, notes }
 * @returns {object} reservation
 */
router.post('/', createReservation);

/**
 * @route DELETE /reservations/:id
 * @desc Xóa đơn đặt bàn theo ID
 * @access Private (chỉ admin hoặc người tạo mới được xóa)
 * @param {number} id - Reservation ID
 */
router.delete('/:id', deleteReservation);

/**
 * @route GET /reservations/:id
 * @desc Lấy thông tin chi tiết một đơn đặt bàn theo ID
 * @access Private (người dùng hoặc admin)
 * @param {number} id - Reservation ID
 * @returns {object} reservation
 */
router.get('/:id', getReservationById);

/**
 * @route GET /reservations
 * @desc Lấy danh sách tất cả các đơn đặt bàn (hỗ trợ phân trang, lọc, sắp xếp)
 * @access Private (admin)
 * @query { page, limit, status, date, user_id }
 * @returns {array} reservations
 */
router.get('/', getReservations);

/**
 * @route GET /reservations/user/:user_id
 * @desc Lấy danh sách đơn đặt bàn của một người dùng
 * @access Private (chỉ người dùng được quyền xem đơn của mình)
 * @param {number} user_id - ID người dùng
 * @returns {array} reservations
 */
router.get('/user/:user_id', getUserReservations);

/**
 * @route PUT /reservations/:id
 * @desc Cập nhật thông tin đơn đặt bàn
 * @access Private (người tạo hoặc admin)
 * @param {number} id - Reservation ID
 * @body { table_id, date, time, guestCount, notes }
 * @returns {object} updated reservation
 */
router.put('/:id', updateReservation);

/**
 * @route PATCH /reservations/:id/status
 * @desc Cập nhật trạng thái đơn đặt bàn (e.g. confirmed, canceled)
 * @access Private (admin hoặc hệ thống xử lý)
 * @param {number} id - Reservation ID
 * @body { status: string }
 * @returns {object} updated reservation
 */
router.patch('/:id/status', updateReservationStatus);

// Xuất router
module.exports = router;
