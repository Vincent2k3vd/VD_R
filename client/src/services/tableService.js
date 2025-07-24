import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
const API = import.meta.env.VITE_BASE_URL_API;



/**
 * Tìm danh sách bàn còn trống với sức chứa >= số lượng khách
 * @param {number} guestCount - Số lượng khách
 * @returns {Promise} Axios response promise
 * @example findGuestCount(6)
 */
export const findGuestCount = (guestCount) => {
  return axios.post(`${API}/tables/search/by-guest`, { guestCount });
};

/**
 * Fetch all tables with optional filters (status, type, sort, pagination, etc.)
 * @param {object} params - Query parameters (e.g., status, type, page, limit)
 * @returns {Promise} Axios response promise
 * @example fetchTables({ status: 'available', page: 1, limit: 6 })
 */
export const fetchTables = (params) =>
  axiosInstance.get("/tables", { params });

/**
 * Fetch a single table by its ID
 * @param {number|string} id - Table ID
 * @returns {Promise} Axios response promise
 * @example fetchTableById(1)
 */
export const fetchTableById = (id) =>
  axios.get(`${API}/tables/${id}`);

/**
 * Fetch tables by status
 * @param {string} status - Table status (e.g., 'available', 'reserved')
 * @returns {Promise} Axios response promise
 * @example fetchTableStatus('available')
 */
export const fetchTableStatus = (status) => {
  return axiosInstance.get(`${API}/tables/status/${status}`);
};

/**
 * Fetch available filter options for table search (status, type, sort, etc.)
 * @returns {Promise} Axios response promise
 * @example fetchTableFilters()
 */
export const fetchTableFilters = () => {
  return axios.get( API +"/tables/filters/options");
};

/**
 * Fetch summary statistics for tables (total, by status)
 * @returns {Promise} Axios response promise
 * @example fetchTableStats()
 */
export const fetchTableStats = () => {
  return axios.get("/tables/stats/summary");
};
