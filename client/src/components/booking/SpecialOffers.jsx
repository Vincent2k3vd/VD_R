import React from "react";

const SpecialOffers = () => (
  <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl shadow-2xl p-6 text-white">
    <h3 className="text-xl font-bold mb-4">🎉 Ưu đãi đặc biệt</h3>
    <div className="space-y-3">
      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <p className="font-semibold">Giảm 20% cho nhóm 8+ người</p>
        <p className="text-sm opacity-90">Áp dụng từ thứ 2 đến thứ 5</p>
      </div>
      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <p className="font-semibold">Miễn phí bánh sinh nhật</p>
        <p className="text-sm opacity-90">Thông báo trước 24h</p>
      </div>
    </div>
  </div>
);

export default SpecialOffers;
