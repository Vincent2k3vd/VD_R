// src/services/reservationService.js

import axiosInstance from "../utils/axiosInstance";

/**
 * 🔍 Lấy tất cả đơn đặt bàn (admin/staff dùng)
 * @param {object} params - Các tham số lọc: page, limit, status, date, user_id
 */
export const getAllReservations = (params) => {
  return axiosInstance.get("/reservations", { params });
};

/**
 * ➕ Tạo đơn đặt bàn mới
 * @param {object} reservationData - Dữ liệu đơn: { user_id, table_id, reservation_date, reservation_time, guest_count, items, customerInfo }
 */
export const createReservation = (reservationData) => {
  return axiosInstance.post("/reservations", reservationData);
};

/**
 * 📄 Lấy thông tin chi tiết một đơn đặt bàn theo ID
 * @param {string|number} id - reservation_id
 */
export const getReservationById = (id) => {
  return axiosInstance.get(`/reservations/${id}`);
};

/**
 * 📜 Lấy danh sách đơn đặt bàn của một người dùng
 * @param {string|number} userId
 */
export const getUserReservations = (userId, accessToken) => {
  return axiosInstance.get(`/reservations/user/${userId}`, {accessToken});
};

/**
 * ✏️ Cập nhật một đơn đặt bàn
 * @param {string|number} id - reservation_id
 * @param {object} updateData - Dữ liệu cập nhật
 */
export const updateReservation = (id, updateData) => {
  return axiosInstance.put(`/reservations/${id}`, updateData);
};

/**
 * 🔄 Cập nhật trạng thái đơn đặt bàn
 * @param {string|number} id
 * @param {string} status - one of: pending, confirmed, cancelled, completed
 */
export const updateReservationStatus = (id, status) => {
  return axiosInstance.patch(`/reservations/${id}/status`, { status });
};

/**
 * 🗑️ Xoá một đơn đặt bàn
 * @param {string|number} id - reservation_id
 */
export const deleteReservation = (id) => {
  return axiosInstance.delete(`/reservations/${id}`);
};

/**
 * 📆 Kiểm tra bàn có sẵn theo ngày, giờ và số lượng khách
 * @param {object} query - { date, time, guestCount }
 */
export const checkTableAvailability = (query) => {
  return axiosInstance.get("/reservations/availability", { params: query });
};
