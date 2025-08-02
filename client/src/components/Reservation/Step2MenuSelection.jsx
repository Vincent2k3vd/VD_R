import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Minus,
  Utensils,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Search,
} from "lucide-react";

const ITEMS_PER_PAGE = 8;

const Step2MenuSelection = ({
  menuData,
  menuLoading,
  selectedItems,
  setSelectedItems,
  setReservationData,
  setStep,
  total,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    setReservationData((prev) => ({
      ...prev,
      items: selectedItems.map((item) => ({
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: item.price,
        special_instructions: item.special_instructions || "",
      })),
      total_amount: total,
    }));
  }, [selectedItems, total, setReservationData]);

  const categories = useMemo(() => {
    if (!Array.isArray(menuData)) return [];
    const unique = [...new Set(menuData.map((item) => item.category))];
    return ["all", ...unique];
  }, [menuData]);

  const filteredMenu = useMemo(() => {
    if (!Array.isArray(menuData)) return [];
    let result =
      selectedCategory === "all"
        ? menuData
        : menuData.filter((item) => item.category === selectedCategory);

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.item_name.toLowerCase().includes(keyword) ||
          (item.description && item.description.toLowerCase().includes(keyword))
      );
    }

    return result;
  }, [menuData, selectedCategory, searchKeyword]);

  const paginatedMenu = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMenu.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMenu, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredMenu.length / ITEMS_PER_PAGE);
  }, [filteredMenu]);

  const getItemQuantity = (itemId) => {
    return (
      selectedItems.find((item) => item.menu_item_id === itemId)?.quantity || 0
    );
  };

  const handleAddItem = (menuItem) => {
    setSelectedItems((prev) => {
      const index = prev.findIndex(
        (item) => item.menu_item_id === menuItem.menu_item_id
      );
      if (index >= 0) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...prev, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (menuItemId) => {
    setSelectedItems((prev) => {
      const index = prev.findIndex((item) => item.menu_item_id === menuItemId);
      if (index >= 0) {
        const updated = [...prev];
        const current = updated[index];
        if (current.quantity > 1) {
          updated[index].quantity -= 1;
          return updated;
        } else {
          return updated.filter((item) => item.menu_item_id !== menuItemId);
        }
      }
      return prev;
    });
  };

  const getTotalItems = () =>
    selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  if (menuLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Đang tải menu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Chọn Món Ăn
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "Tất cả" : category}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Tìm kiếm món..."
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {paginatedMenu.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không có món ăn nào</p>
          </div>
        ) : (
          paginatedMenu.map((item) => {
            const quantity = getItemQuantity(item.menu_item_id);
            return (
              <div
                key={item.menu_item_id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col justify-between"
              >
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <img
                    src={item.image_url}
                    alt=""
                    className="w-[184px] h-[135px]"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.item_name}
                  </h3>
                  {item.description && (
                    <p
                      className="text-sm text-gray-600 mb-2 line-clamp-2 truncate overflow-hidden whitespace-nowrap"
                      title={item.description}
                    >
                      {item.description}
                    </p>
                  )}
                  <p className="text-lg font-bold text-blue-600">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  {quantity === 0 ? (
                    <button
                      onClick={() => handleAddItem(item)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      Thêm món
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() => handleRemoveItem(item.menu_item_id)}
                        className="bg-red-100 hover:bg-red-200 p-2 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-red-600" />
                      </button>
                      <span className="font-semibold text-lg px-4">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Trước
          </button>
          <span className="text-sm font-medium text-gray-700">
            Trang {currentPage}/{totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-700">
                {getTotalItems()} món đã chọn
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {total.toLocaleString("vi-VN")}đ
              </div>
              <div className="text-sm text-gray-500">Tạm tính</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Tiếp theo
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Step2MenuSelection;
