import axios from "axios";
// import axiosInstance from "../utils/axiosInstance";
const API_URL = import.meta.env.VITE_API_URL1;

class Reservation {
  
  async create(date, time, guests, table_type, special_requests, menu_items) {
    try {
      const res = await axios.post(
        API_URL + "booking",
        {
          date,
          time,
          guests,
          table_type,
          special_requests,
          menu_items
        },
        {
          withCredentials: true
        }
      );
      return res.data;
    } catch (error) {
      this.handleError(error, "Đặt bàn thất bại");
    }
  }


  // GET /tables?status=available
  async showTable(status = null) {
  try {
    const query = status ? `?status=${status}` : "";
    const res = await axios.get(API_URL + "table" + query, {
      withCredentials: true
    });

    // 👇 Chắc chắn trả về mảng
    return Array.isArray(res.data?.data) ? res.data.data : res.data;
  } catch (error) {
    this.handleError(error, "Không thể lấy danh sách bàn");
  }
}


getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  // ✅ Lấy danh sách đặt bàn của user hiện tại
  async getMyReservations(userId) {
  try {
    const res = await axios.get(API_URL + "/user/" + userId);
    return res.data;
  } catch (error) {
    this.handleError(error, "Không thể lấy danh sách đặt bàn");
  }
}


  // Xử lý lỗi chung
  handleError(error, defaultMessage) {
    const message =
      error?.response?.data?.message || error.message || defaultMessage;
    console.error("Reservation API Error:", message);
    throw new Error(message);
  }
}

export default new Reservation();
