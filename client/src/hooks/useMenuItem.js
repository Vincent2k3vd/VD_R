import useQuery from "./useQuery";
import * as menuService from "../services/menuItemService";

/**
 * Lấy danh sách tất cả món ăn (có lọc, phân trang, sắp xếp)
 */
export const useMenuList = (filters = {}, enabled = true) => {
  return useQuery(() => menuService.fetchAllMenuItems(filters), [JSON.stringify(filters)], enabled);
};

/**
 * Lấy món ăn nổi bật
 */
export const useFeaturedMenu = () => {
  return useQuery(() => menuService.fetchFeaturedMenuItems(), []);
};

/**
 * Lấy món ăn theo category
 */
export const useMenuByCategory = (categoryId, enabled = true) => {
  return useQuery(() => menuService.fetchMenuItemsByCategory(categoryId), [categoryId], enabled);
};

/**
 * Lấy món ăn theo ID
 */
export const useMenuDetail = (id, enabled = true) => {
  return useQuery(() => menuService.fetchMenuItemById(id), [id], enabled);
};
