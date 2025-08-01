import React from "react";
import { Heart } from "lucide-react";

const TabFavorites = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Yêu thích</h2>
            <p className="text-blue-100 mt-1">
              Quản lý thông tin tài khoản của bạn
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Heart />
          <h2 className="text-lg font-semibold">Món ăn yêu thích</h2>
        </div>
        <p>Chức năng này đang được phát triển...</p>
      </div>
    </div>
  );
};

export default TabFavorites;
