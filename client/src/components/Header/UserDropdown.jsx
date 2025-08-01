import React, { useState, useEffect, useRef } from "react";
import {
  UserCircle,
  Settings,
  Bell,
  Shield,
  LogOut,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const UserDropdown = ({ setIsDropdownOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const navigator = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  // Menu items configuration
  const menuItems = [
    {
      icon: UserCircle,
      title: "Thông tin cá nhân",
      subtitle: "Xem và chỉnh sửa hồ sơ",
      action: () => handleNavigation("/profile"),
      hoverColor: "hover:bg-gray-50",
    },
    {
      icon: Settings,
      title: "Cài đặt",
      subtitle: "Tùy chỉnh tài khoản",
      action: () => handleNavigation("/settings"),
      hoverColor: "hover:bg-gray-50",
    },
    {
      icon: Bell,
      title: "Thông báo",
      subtitle: "Quản lý thông báo",
      action: () => handleNavigation("/notifications"),
      hoverColor: "hover:bg-gray-50",
    },
    {
      icon: Shield,
      title: "Bảo mật",
      subtitle: "Mật khẩu và bảo mật",
      action: () => handleNavigation("/security"),
      hoverColor: "hover:bg-gray-50",
    },
  ];

  // Generic navigation handler
  const handleNavigation = (path) => {
    navigator(path);
    setIsDropdownOpen(false);
  };

  // Enhanced logout handler with loading state
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();

      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsDropdownOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [setIsDropdownOpen]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
      role="menu"
      aria-label="User menu"
    >
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
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              onKeyDown={(e) => handleKeyDown(e, item.action)}
              className={`w-full px-4 py-3 text-left ${item.hoverColor} flex items-center gap-3 text-gray-700 transition-colors focus:outline-none focus:bg-gray-50`}
              role="menuitem"
              tabIndex={0}
            >
              <IconComponent className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              </div>
            </button>
          );
        })}

        <hr className="my-2 border-gray-200" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          onKeyDown={(e) => handleKeyDown(e, handleLogout)}
          disabled={isLoggingOut}
          className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors focus:outline-none focus:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          role="menuitem"
          tabIndex={0}
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <div>
            <div className="font-medium text-sm">
              {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            </div>
            <div className="text-xs text-red-500">
              {isLoggingOut ? "Vui lòng chờ..." : "Thoát khỏi tài khoản"}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
