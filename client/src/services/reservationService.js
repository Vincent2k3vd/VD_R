// src/services/reservationService.js

import axiosInstance from "../utils/axiosInstance"; // axios đã cấu hình sẵn auth, baseURL...

/**
 * Tạo đơn đặt bàn mới
 * @param {object} reservationData - Dữ liệu đơn (user_id, table_id, date, time, guestCount, notes)
 * @returns {Promise}
 */
export const createReservation = (reservationData) => {
  return axiosInstance.post("/reservations", reservationData);
};

/**
 * Lấy danh sách tất cả đơn đặt bàn (admin dùng)
 * @param {object} params - Các tham số lọc: page, limit, status, date, user_id
 * @returns {Promise}
 */
export const getAllReservations = (params) => {
  return axiosInstance.get("/reservations", { params });
};

/**
 * Lấy đơn đặt bàn theo ID
 * @param {string|number} id - ID của đơn
 * @returns {Promise}
 */
export const getReservationById = (id) => {
  return axiosInstance.get(`/reservations/${id}`);
};

/**
 * Lấy danh sách đơn của người dùng theo user_id
 * @param {string|number} userId
 * @returns {Promise}
 */
export const getUserReservations = (userId) => {
  return axiosInstance.get(`/reservations/user/${userId}`);
};

/**
 * Cập nhật đơn đặt bàn
 * @param {string|number} id
 * @param {object} updateData - Thông tin cần cập nhật
 * @returns {Promise}
 */
export const updateReservation = (id, updateData) => {
  return axiosInstance.put(`/reservations/${id}`, updateData);
};

/**
 * Cập nhật trạng thái đơn đặt bàn (e.g. confirmed, canceled)
 * @param {string|number} id
 * @param {string} status - Trạng thái mới
 * @returns {Promise}
 */
export const updateReservationStatus = (id, status) => {
  return axiosInstance.patch(`/reservations/${id}/status`, { status });
};

/**
 * Xóa đơn đặt bàn
 * @param {string|number} id
 * @returns {Promise}
 */
export const deleteReservation = (id) => {
  return axiosInstance.delete(`/reservations/${id}`);
};

/**
 * Kiểm tra tình trạng bàn trống
 * @param {object} query - Tham số { date, time, guestCount }
 * @returns {Promise}
 */
export const checkTableAvailability = (query) => {
  return axiosInstance.get("/reservations/availability", { params: query });
};
