import React, { useState } from "react";
import { Star, Clock, Flame, Leaf, Award } from "lucide-react";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: "all", name: "Tất cả", icon: "🍽️" },
    { id: "appetizer", name: "Khai vị", icon: "🥗" },
    { id: "main", name: "Món chính", icon: "🍖" },
    { id: "seafood", name: "Hải sản", icon: "🦐" },
    { id: "vegetarian", name: "Chay", icon: "🥬" },
    { id: "dessert", name: "Tráng miệng", icon: "🍰" },
    { id: "drinks", name: "Đồ uống", icon: "🍹" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Bò Wagyu Nướng",
      category: "main",
      price: 850000,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      description:
        "Thịt bò Wagyu A5 nướng hoàn hảo, kèm rau củ nướng và sốt đặc biệt",
      rating: 4.9,
      cookTime: "25 phút",
      isSpicy: true,
      isNew: true,
      tags: ["Premium", "Signature"],
    },
    {
      id: 2,
      name: "Tôm Hùm Nướng Bơ Tỏi",
      category: "seafood",
      price: 1200000,
      image:
        "https://images.unsplash.com/photo-1559737558-2c6635eae5ba?w=400&h=300&fit=crop",
      description: "Tôm hùm tươi nướng với bơ tỏi thơm, kèm khoai tây nghiền",
      rating: 4.8,
      cookTime: "20 phút",
      isSpicy: false,
      isNew: false,
      tags: ["Hải sản tươi", "Đặc sản"],
    },
    {
      id: 3,
      name: "Salad Quinoa Superfood",
      category: "vegetarian",
      price: 280000,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      description: "Quinoa, cải kale, quả mọng, hạt chia với sốt tahini",
      rating: 4.7,
      cookTime: "10 phút",
      isSpicy: false,
      isNew: false,
      tags: ["Healthy", "Vegan"],
      isVegetarian: true,
    },
    {
      id: 4,
      name: "Súp Truffle Nấm",
      category: "appetizer",
      price: 450000,
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      description: "Súp nấm porcini với truffle đen Pháp và kem tươi",
      rating: 4.6,
      cookTime: "15 phút",
      isSpicy: false,
      isNew: true,
      tags: ["Premium", "Luxury"],
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      category: "dessert",
      price: 180000,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      description: "Bánh chocolate nóng với nhân chảy, kèm kem vanilla",
      rating: 4.9,
      cookTime: "12 phút",
      isSpicy: false,
      isNew: false,
      tags: ["Signature", "Hot"],
    },
    {
      id: 6,
      name: "Mocktail Passion Fruit",
      category: "drinks",
      price: 120000,
      image:
        "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop",
      description: "Nước ép chanh dây tươi với bạc hà và soda",
      rating: 4.5,
      cookTime: "5 phút",
      isSpicy: false,
      isNew: false,
      tags: ["Refreshing", "Healthy"],
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        {/* SVG background must be properly escaped for JSX/Tailwind */}
        <div className="absolute inset-0 bg-[url(&quot;data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20xmlns%3D'http://www.w3.org/2000/svg'%3E%3Cg%20fill%3D'none'%20fill-rule%3D'evenodd'%3E%3Cg%20fill%3D'%23ffffff'%20fill-opacity%3D'0.05'%3E%3Ccircle%20cx%3D'30'%20cy%3D'30'%20r%3D'1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)] animate-pulse"></div>
        <div className="relative px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
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
              Trải nghiệm ẩm thực tinh tế với những món ăn được chế biến từ
              nguyên liệu cao cấp nhất
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg shadow-slate-800/25"
                    : "bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {item.isNew && (
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Mới
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      Chay
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-slate-700">
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {item.name}
                  </h3>
                  {item.isSpicy && (
                    <Flame className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-slate-900">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{item.cookTime}</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full mt-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  Đặt món
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Không tìm thấy món ăn
            </h3>
            <p className="text-slate-600">Vui lòng chọn danh mục khác</p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Đặt món thành công!
              </h3>
              <p className="text-slate-600">
                Món <span className="font-medium">{selectedItem.name}</span> đã
                được thêm vào đơn hàng
              </p>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-700 text-white py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-600 transition-all duration-300"
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
