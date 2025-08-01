import useQuery from "./useQuery";
import * as menuService from "../services/menuItemService";

/**
 * 📋 Lấy danh sách món ăn có lọc, phân trang, sắp xếp
 * @param {object} filters - ví dụ: { category_id, is_available, page, limit }
 * @param {boolean} enabled
 */
export const useMenuList = (filters = {}, enabled = true) => {
  return useQuery(
    () => menuService.fetchFilteredMenuItems(filters),
    [JSON.stringify(filters)],
    { enabled }
  );
};

/**
 * ⭐ Lấy danh sách món ăn nổi bật
 */
export const useFeaturedMenu = () => {
  return useQuery(
    () => menuService.fetchFeaturedMenuItems(),
    [],
    { enabled: true }
  );
};

/**
 * 📂 Lấy danh sách món ăn theo danh mục
 * @param {string|number} categoryId
 * @param {boolean} enabled
 */
export const useMenuByCategory = (categoryId, enabled = true) => {
  return useQuery(
    () => menuService.fetchMenuItemsByCategory(categoryId),
    [categoryId],
    { enabled: !!categoryId && enabled }
  );
};

/**
 * 📄 Lấy chi tiết món ăn theo ID
 * @param {string|number} id
 * @param {boolean} enabled
 */
export const useMenuDetail = (id, enabled = true) => {
  return useQuery(
    () => menuService.fetchMenuItemById(id),
    [id],
    { enabled: !!id && enabled }
  );
};
