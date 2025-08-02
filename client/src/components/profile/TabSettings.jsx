import React from "react";
import { Settings } from "lucide-react";

const TabSettings = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Cài đặt</h2>
            <p className="text-blue-100 mt-1">
              Quản lý thông tin tài khoản của bạn
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Settings className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings />
          <h2 className="text-lg font-semibold">Cài đặt</h2>
        </div>
        <p>Chức năng này đang được phát triển...</p>
      </div>
    </div>
  );
};

export default TabSettings;
