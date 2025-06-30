import React from "react";
import { UserCircle, Settings, Bell, Shield, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../stores/authSlice";

import Auth from "../../services/Auth";
import { toast } from "react-toastify";

const UserDropdown = ({ setIsDropdownOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleShowProfile = () => {
    navigator("/profile");
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await Auth.logout();
      if (res.success) {
        localStorage.clear();
        dispatch(logout());
        setIsDropdownOpen(false);
        navigator("/");
        toast.success("Đã đăng xuất!!");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
      {/* User Info Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <UserCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="font-semibold text-sm">
              {user ? user.username : "Người dùng"}
            </div>
            <div className="text-xs text-white/80">
              {user ? user.email : "email@example.com"}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={() => handleShowProfile()}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
        >
          <UserCircle className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-medium text-sm">Thông tin cá nhân</div>
            <div className="text-xs text-gray-500">Xem và chỉnh sửa hồ sơ</div>
          </div>
        </button>
        <button
          onClick={() => setIsDropdownOpen(false)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-medium text-sm">Cài đặt</div>
            <div className="text-xs text-gray-500">Tùy chỉnh tài khoản</div>
          </div>
        </button>
        <button
          onClick={() => setIsDropdownOpen(false)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-medium text-sm">Thông báo</div>
            <div className="text-xs text-gray-500">Quản lý thông báo</div>
          </div>
        </button>
        <button
          onClick={() => setIsDropdownOpen(false)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
        >
          <Shield className="w-5 h-5 text-gray-500" />
          <div>
            <div className="font-medium text-sm">Bảo mật</div>
            <div className="text-xs text-gray-500">Mật khẩu và bảo mật</div>
          </div>
        </button>
        <hr className="my-2 border-gray-200" />
        <button
          onClick={() => {
            handleLogout();
          }}
          className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <div>
            <div className="font-medium text-sm">Đăng xuất</div>
            <div className="text-xs text-red-500">Thoát khỏi tài khoản</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
