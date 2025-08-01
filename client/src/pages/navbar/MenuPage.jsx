import React, { useEffect, useState } from "react";
import { Award, Clock, Flame, Leaf, Star } from "lucide-react";
import { useMenuList } from "../../hooks/useMenuItem";

const categories = [
  { id: 0, name: "Tất cả", icon: "🍽️" },
  { id: 1, name: "Khai vị", icon: "🍖" },
  { id: 2, name: "Món chính", icon: "🥗" },
  { id: 3, name: "Lẩu & Nướng", icon: "🥩" },
  { id: 4, name: "Hải sản", icon: "🤐" },
  { id: 5, name: "Đồ uống", icon: "🍹" },
  { id: 6, name: "Tráng miệng", icon: "🍰" },
  { id: 7, name: "Món chay", icon: "🥬" },
  { id: 8, name: "Combo", icon: "🍜" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: menuData } = useMenuList(
    {
      page,
      limit: 6,
      sortBy: "price",
      sortOrder: "asc",
      category_id: activeCategory !== 0 ? activeCategory : undefined,
      search: searchTerm || undefined,
      is_available: true,
    },
    true
  );

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchTerm]);

  const totalPages = menuData?.pagination?.totalPages || 1;
  const menuItems = menuData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="relative px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white font-medium">
              Nhà hàng được vinh danh Michelin
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Thực Đơn Đặc Biệt
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Trải nghiệm ẩm thực tinh tế với nguyên liệu cao cấp
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Tìm món ăn..."
              className="w-full px-4 py-3 rounded-full border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.menu_item_id}
              className="group bg-white rounded-2xl shadow hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image_url || "/no-image.jpg"}
                  alt={item.item_name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.is_featured && (
                    <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                      Mới
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Chay
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-slate-800">{item.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.item_name}
                  </h3>
                  {item.isSpicy && <Flame className="w-5 h-5 text-red-500" />}
                </div>

                <p className="text-slate-600 text-sm mb-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {item.preparation_time}phút
                  </span>
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full mt-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white py-3 rounded-xl font-medium hover:scale-[1.02] hover:shadow-lg transition"
                >
                  Đặt món
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 400 });
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border transition-all ${
                page === p
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Không tìm thấy món ăn
            </h3>
            <p className="text-slate-600">
              Vui lòng thử từ khóa khác hoặc chọn danh mục khác.
            </p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Đặt món thành công!
            </h3>
            <p className="text-slate-600">
              Món <strong>{selectedItem.name}</strong> đã được thêm vào đơn
              hàng.
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white py-3 rounded-xl hover:from-slate-700 hover:to-slate-600 transition"
            >
              Tiếp tục đặt món
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
