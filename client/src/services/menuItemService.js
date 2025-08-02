import axiosInstance from '../utils/axiosInstance';
const API = import.meta.env.VITE_BASE_URL_API;

/**
 * 🔍 Tìm kiếm món ăn (autocomplete / search box)
 * @hook useQuery(['menu-search', query], ...)
 */
export const searchMenuItems = (query, limit = 5) => {
  return axiosInstance.get(`${API}/menu-items/search`, {
    params: {
      keyword: query,
      limit,
      sortBy: 'item_name',
      sortOrder: 'ASC'
    }
  });
};

/**
 * 📋 Lấy tất cả món ăn (đơn giản)
 * @hook useQuery(['menu-all'], ...)
 */
export const fetchAllMenuItems = () => {
  return axiosInstance.get(`${API}/menu-items/all`);
};

/**
 * 📦 Lấy danh sách món ăn có lọc/phân trang
 * @param {object} params - { category_id, is_available, page, limit, sortBy, sortOrder }
 * @hook useQuery(['menu-filter', params], ...)
 */
export const fetchFilteredMenuItems = (params) => {
  return axiosInstance.get(`${API}/menu-items`, { params });
};

/**
 * 📄 Lấy chi tiết món ăn theo ID
 * @hook useQuery(['menu-detail', id], ...)
 */
export const fetchMenuItemById = (id, includeAll = true) => {
  return axiosInstance.get(`${API}/menu-items/${id}`, {
    params: { include_all: includeAll }
  });
};

/**
 * ⭐ Lấy món ăn nổi bật
 * @hook useQuery(['menu-featured'], ...)
 */
export const fetchFeaturedMenuItems = () => {
  return axiosInstance.get(`${API}/menu-items/featured`);
};

/**
 * 📂 Lấy món ăn theo danh mục
 * @hook useQuery(['menu-category', categoryId], ...)
 */
export const fetchMenuItemsByCategory = (category_id, include_variants = false) => {
  return axiosInstance.get(`${API}/menu-items/category/${category_id}`, {
    params: {
      include_variants,
      only_available: true
    }
  });
};

/**
 * ➕ Tạo món ăn mới (admin)
 * @hook useMutation
 */
export const createMenuItem = (data) => {
  return axiosInstance.post(`${API}/menu-items`, data);
};

/**
 * ✏️ Cập nhật món ăn (admin)
 * @hook useMutation
 */
export const updateMenuItem = (id, data) => {
  return axiosInstance.put(`${API}/menu-items/${id}`, data);
};

/**
 * 🗑️ Xoá món ăn (admin)
 * @hook useMutation
 */
export const deleteMenuItem = (id) => {
  return axiosInstance.delete(`${API}/menu-items/${id}`);
};

/**
 * 🔄 Cập nhật trạng thái món ăn (hiện/ẩn)
 * @hook useMutation
 */
export const updateMenuItemAvailability = (id, is_available) => {
  return axiosInstance.patch(`${API}/menu-items/${id}/availability`, {
    is_available
  });
};
