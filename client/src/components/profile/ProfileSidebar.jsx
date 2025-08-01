import React from "react";
import {
  User,
  History,
  Heart,
  Award,
  Settings,
  Star,
  Camera,
} from "lucide-react";

const ProfileSidebar = ({
  profileData,
  avatarUrl,
  fileInputRef,
  handleImageChange,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600"
            onClick={() => fileInputRef.current.click()}
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-4">
          {profileData?.username}
        </h3>
        <p className="text-gray-600">{profileData?.email}</p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">Thành viên VIP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">
            {profileData?.loyaltyPoints}
          </div>
          <div className="text-xs text-gray-600">Điểm tích lũy</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">
            {profileData?.totalOrders}
          </div>
          <div className="text-xs text-gray-600">Lần đặt bàn</div>
        </div>
      </div>

      <nav className="space-y-2">
        {[
          { id: "profile", label: "Thông tin", icon: User },
          { id: "history", label: "Lịch sử", icon: History },
          { id: "favorites", label: "Yêu thích", icon: Heart },
          { id: "achievements", label: "Thành tích", icon: Award },
          { id: "settings", label: "Cài đặt", icon: Settings },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
