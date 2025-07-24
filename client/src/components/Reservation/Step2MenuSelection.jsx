import React, { useState } from "react";
import {
  Plus,
  Minus,
  Utensils,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";

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

  // Tự động cập nhật reservationData.items khi selectedItems thay đổi
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

  // Get unique categories from menu data
  const getCategories = () => {
    if (!menuData || !Array.isArray(menuData)) return [];
    const categories = [...new Set(menuData.map((item) => item.category))];
    return ["all", ...categories];
  };

  // Filter menu items by category
  const getFilteredMenu = () => {
    if (!menuData || !Array.isArray(menuData)) return [];
    if (selectedCategory === "all") return menuData;
    return menuData.filter((item) => item.category === selectedCategory);
  };

  // Get quantity of specific item
  const getItemQuantity = (itemId) => {
    const item = selectedItems.find((item) => item.menu_item_id === itemId);
    return item ? item.quantity : 0;
  };

  // Add item to selection
  const handleAddItem = (menuItem) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.menu_item_id === menuItem.menu_item_id
      );

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // New item, add to selection
        return [
          ...prev,
          {
            menu_item_id: menuItem.menu_item_id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Remove item from selection
  const handleRemoveItem = (menuItemId) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.menu_item_id === menuItemId
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        const currentQuantity = updatedItems[existingItemIndex].quantity;

        if (currentQuantity > 1) {
          // Decrease quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: currentQuantity - 1,
          };
          return updatedItems;
        } else {
          // Remove item completely
          return updatedItems.filter(
            (item) => item.menu_item_id !== menuItemId
          );
        }
      }
      return prev;
    });
  };

  const handleNext = () => {
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
  };

  const getTotalItems = () => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  };

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

  const filteredMenu = getFilteredMenu();
  const categories = getCategories();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Chọn Món Ăn
      </h2>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "Tất cả" : category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredMenu.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không có món ăn nào</p>
          </div>
        ) : (
          filteredMenu.map((item) => {
            const quantity = getItemQuantity(item.menu_item_id);
            return (
              <div
                key={item.menu_item_id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
              >
                {/* Menu Item Image Placeholder */}
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Utensils className="w-8 h-8 text-gray-400" />
                </div>

                {/* Menu Item Info */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <p className="text-lg font-bold text-blue-600">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
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

      {/* Order Summary */}
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

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>

        <button
          type="button"
          onClick={handleNext}
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
