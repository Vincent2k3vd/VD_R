import axiosInstance from '../utils/axiosInstance';
const API = import.meta.env.VITE_BASE_URL_API;

const userService = {
  // Lấy hồ sơ người dùng hiện tại
  getProfile: async (token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.get(`${API}/users/profile`, config);
    return res.data;
  },

  // Lấy người dùng theo ID
  getUser: async (id) => {
    const res = await axiosInstance.get(`${API}/users/${id}`);
    return res.data;
  },

  // Cập nhật thông tin cá nhân
  updateUser: async (payload, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.put(`${API}/users`, payload, config);
    return res.data;
  },

  // Cập nhật avatar
  updateAvatar: async (formData, token) => {
    const res = await axiosInstance.patch(`${API}/users/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  // Đổi mật khẩu người dùng
  changePassword: async (payload, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.put(
      `${API}/users/me/password`,
      payload,
      config
    );
    return res.data;
  },

  // Lấy danh sách tất cả người dùng (admin, employee)
  getAllUsers: async (token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.get(`${API}/users`, config);
    return res.data;
  },

  // Cập nhật vai trò người dùng
  updateUserRole: async (userId, role_id, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.patch(
      `${API}/users/${userId}/role`,
      { role_id },
      config
    );
    return res.data;
  },

  // Xoá người dùng
  deleteUser: async (userId, token) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axiosInstance.delete(`${API}/users/${userId}`, config);
    return res.data;
  },

  // Xoá localStorage liên quan đến authentication
  clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('persist:root');
  },
};

export default userService;
