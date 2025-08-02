import useQuery from "./useQuery";
import {
  getAllReservations,
  getReservationById,
  getUserReservations,
  checkTableAvailability,
  createReservation,
} from "../services/reservationService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * 📋 Lấy danh sách tất cả đơn đặt bàn (có lọc/phân trang)
 * @param {object} params - { page, limit, status, date, user_id }
 */
export const useReservations = (params = {}) => {
  return useQuery(
    () => getAllReservations(params),
    [JSON.stringify(params)],
    { enabled: true }
  );
};

/**
 * ➕ Hook tạo mới đơn đặt bàn
 */
export const useCreateReservation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await createReservation(data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Đặt bàn thành công!");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "❌ Đặt bàn thất bại!";
      toast.error(msg);
    },
  });
};

/**
 * 📄 Lấy chi tiết đơn đặt bàn theo ID
 * @param {string|number} id
 */
export const useReservationById = (id) => {
  return useQuery(
    () => getReservationById(id),
    [id],
    { enabled: !!id }
  );
};

/**
 * 🧑‍💼 Lấy danh sách đơn theo user_id
 * @param {string|number} userId
 */
export const useUserReservations = (userId) => {
  return useQuery(
    () => getUserReservations(userId),
    [userId],
    { enabled: !!userId }
  );
};

/**
 * 🔍 Kiểm tra bàn trống theo thời gian, ngày và số khách
 * @param {object} query - { date, time, guestCount }
 * @param {boolean} enabled - Có thực thi query hay không
 */
export const useTableAvailability = (query, enabled = true) => {
  return useQuery(
    () => checkTableAvailability(query),
    [JSON.stringify(query)],
    { enabled }
  );
};
