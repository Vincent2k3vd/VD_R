import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Gift,
  Settings,
  Edit3,
  Camera,
  Save,
  X,
  Award,
  TrendingUp,
  Utensils,
  History,
} from "lucide-react";
import Auth from "../services/Auth";
import { useEffect } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState(null);

  const bookingHistory = [
    {
      id: 1,
      date: "2024-06-25",
      time: "19:00",
      table: "Bàn VIP",
      guests: 4,
      status: "completed",
      amount: 1200000,
      rating: 5,
    },
    {
      id: 2,
      date: "2024-06-18",
      time: "18:30",
      table: "Bàn Thường",
      guests: 2,
      status: "completed",
      amount: 650000,
      rating: 4,
    },
    {
      id: 3,
      date: "2024-06-20",
      time: "20:00",
      table: "Phòng Riêng",
      guests: 8,
      status: "cancelled",
      amount: 0,
      rating: null,
    },
    {
      id: 4,
      date: "2024-07-02",
      time: "19:30",
      table: "Bàn Ngoài Trời",
      guests: 3,
      status: "upcoming",
      amount: 850000,
      rating: null,
    },
  ];

  const achievements = [
    {
      title: "Khách Hàng Thân Thiết",
      icon: "🏆",
      description: "Đã đặt bàn 25+ lần",
      achieved: true,
    },
    {
      title: "Người Đánh Giá",
      icon: "⭐",
      description: "Đánh giá 15+ lần",
      achieved: true,
    },
    {
      title: "Thực Khách VIP",
      icon: "👑",
      description: "Chi tiêu trên 5 triệu",
      achieved: true,
    },
    {
      title: "Chia Sẻ Niềm Vui",
      icon: "❤️",
      description: "Giới thiệu 5+ bạn bè",
      achieved: false,
    },
  ];

  const favoriteItems = [
    {
      name: "Bò Nướng Tỏi",
      price: "280,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop",
      orders: 12,
    },
    {
      name: "Cơm Chiên Hải Sản",
      price: "180,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=100&h=100&fit=crop",
      orders: 8,
    },
    {
      name: "Lẩu Thái Tôm",
      price: "320,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100&h=100&fit=crop",
      orders: 6,
    },
  ];
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await Auth.refreshToken();
        const data = await Auth.getUserProfile();
        if (data?.user) {
          setProfileData(data.user);
          setEditData(data.user);
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setProfileData(editData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "upcoming":
        return "Sắp tới";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData?.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                    <Camera className="w-4 h-4" />
                  </button>
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

              {/* Stats */}
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

              {/* Navigation */}
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Thông Tin Cá Nhân
                    </h2>
                    <button
                      onClick={handleEditToggle}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                        isEditing
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {isEditing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit3 className="w-4 h-4" />
                      )}
                      <span>{isEditing ? "Lưu" : "Chỉnh sửa"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl">
                          {profileData?.username}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{profileData?.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {profileData?.phone ? (
                            <span>{profileData?.phone}</span>
                          ) : (
                            <span>Thêm số điện thoại</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ngày sinh
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.birthday}
                          onChange={(e) =>
                            handleInputChange("birthday", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(profileData?.birthday).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa chỉ
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {profileData?.address ? (
                            <span>{profileData?.address}</span>
                          ) : (
                            <span>Thêm địa chỉ</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <h3 className="font-bold text-gray-800 mb-4">
                      Thông tin thành viên
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Thành viên từ</p>
                          <p className="font-semibold">
                            {new Date(
                              profileData?.memberSince
                            ).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Cấp độ</p>
                          <p className="font-semibold text-yellow-600">
                            VIP Gold
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Bàn yêu thích</p>
                          <p className="font-semibold">
                            {profileData?.favoriteTable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">
                    Lịch Sử Đặt Bàn
                  </h2>
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">
                                {booking.table}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.date).toLocaleDateString(
                                  "vi-VN"
                                )}{" "}
                                - {booking.time}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusText(booking.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Số khách</p>
                            <p className="font-semibold">
                              {booking.guests} người
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tổng tiền</p>
                            <p className="font-semibold">
                              {booking.amount > 0
                                ? formatCurrency(booking.amount)
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Đánh giá</p>
                            <div className="flex items-center space-x-1">
                              {booking.rating ? (
                                [...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < booking.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))
                              ) : (
                                <span className="text-gray-400">
                                  Chưa đánh giá
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            {booking.status === "upcoming" && (
                              <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-all">
                                Hủy đặt bàn
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">
                    Món Ăn Yêu Thích
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteItems.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-semibold mb-2">
                          {item.price}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          Đã gọi {item.orders} lần
                        </p>
                        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all">
                          Đặt lại
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === "achievements" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">
                    Thành Tích
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border-2 ${
                          achievement.achieved
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                              achievement.achieved
                                ? "bg-green-200"
                                : "bg-gray-200"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            achievement.achieved
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.achieved
                            ? "✓ Đã đạt được"
                            : "○ Chưa đạt được"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">
                    Cài Đặt
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <h3 className="font-bold text-gray-800 mb-4">
                        Thông báo
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Email thông báo đặt bàn
                          </span>
                          <input
                            type="checkbox"
                            className="toggle"
                            defaultChecked
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">SMS xác nhận</span>
                          <input
                            type="checkbox"
                            className="toggle"
                            defaultChecked
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">
                            Thông báo khuyến mãi
                          </span>
                          <input type="checkbox" className="toggle" />
                        </label>
                      </div>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-xl">
                      <h3 className="font-bold text-gray-800 mb-4">Bảo mật</h3>
                      <div className="space-y-4">
                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                          Đổi mật khẩu
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                          Xác thực 2 bước
                        </button>
                      </div>
                    </div>

                    <div className="p-6 border border-red-200 rounded-xl bg-red-50">
                      <h3 className="font-bold text-red-800 mb-4">
                        Vùng nguy hiểm
                      </h3>
                      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                        Xóa tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
