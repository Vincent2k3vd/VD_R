import axiosInstance from "../utils/axiosInstance";
const API = import.meta.env.VITE_BASE_URL_API;


/**
 * Gợi ý món ăn theo từ khoá (autocomplete)
 * @param {string} query - từ khoá tìm kiếm
 * @returns {Promise} danh sách món ăn phù hợp
 * @example fetchMenuSuggestions("phở")
 */
export const fetchMenuSuggestions = (query) => {
  return axiosInstance.get(`${API}/menu-items`, {
    params: {
      search: query,
      limit: 5, // Giới hạn kết quả để nhẹ
      sortBy: 'item_name',
      sortOrder: 'ASC'
    }
  });
};

/**
 * Lấy tất cả món ăn với lọc, phân trang và sắp xếp
 * @param {object} params - Các query param: category, availability, page, limit, sort
 */
export const fetchAllMenuItems = (params = {}) => {
  return axiosInstance.get(`${API}/menu-items`, { params });
};

/**
 * Lấy món ăn theo ID
 * @param {string|number} id
 */
export const fetchMenuItemById = (id) => {
  return axiosInstance.get(`${API}/menu-items/${id}`);
};

/**
 * Tạo món ăn mới
 * @param {object} data - Dữ liệu món ăn
 */
export const createMenuItem = (data) => {
  return axiosInstance.post(`${API}/menu-items`, data);
};

/**
 * Cập nhật món ăn
 * @param {string|number} id
 * @param {object} data - Dữ liệu cập nhật
 */
export const updateMenuItem = (id, data) => {
  return axiosInstance.put(`${API}/menu-items/${id}`, data);
};

/**
 * Xóa món ăn
 * @param {string|number} id
 */
export const deleteMenuItem = (id) => {
  return axiosInstance.delete(`${API}/menu-items/${id}`);
};

/**
 * Cập nhật trạng thái còn bán/ẩn của món ăn (availability)
 * @param {string|number} id
 * @param {boolean} available
 */
export const updateMenuItemAvailability = (id, available) => {
  return axiosInstance.patch(`${API}/menu-items/${id}/availability`, {
    available,
  });
};

/**
 * Lấy danh sách món ăn nổi bật (featured)
 */
export const fetchFeaturedMenuItems = () => {
  return axiosInstance.get(`${API}/menu-items/featured`);
};

/**
 * Lấy món ăn theo category ID
 * @param {string|number} category_id
 */
export const fetchMenuItemsByCategory = (category_id) => {
  return axiosInstance.get(`${API}/menu-items/category/${category_id}`);
};
