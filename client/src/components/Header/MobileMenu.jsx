import React, { useState } from "react";
import { Calendar, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const reduxUser = useSelector((state) => state.auth.user);
  return (
    <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="px-4 py-6 space-y-4">
        <NavLink
          to="/"
          className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
        >
          Trang chủ
        </NavLink>
        <NavLink
          to="/menu"
          className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
        >
          Thực đơn
        </NavLink>
        <NavLink
          to="/about"
          className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
        >
          Về chúng tôi
        </NavLink>
        <NavLink
          to="/contact"
          className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors"
        >
          Liên hệ
        </NavLink>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          <div className="flex justify-start pb-5">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg">
              <Calendar className="w-6 h-6 inline mr-1 mb-1" />
              Đặt bàn ngay
            </button>

            <button className="relative p-3 text-gray-600 hover:text-amber-600 transition-colors border border-gray-200 rounded-lg ml-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {reduxUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:brightness-110 transition text-xl"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {reduxUser.avatar ? (
                    <img
                      src={reduxUser.avatar}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8" />
                  )}
                </div>
                <span>{reduxUser.username}</span>
              </button>
              {isDropdownOpen && (
                <UserDropdown setIsDropdownOpen={setIsDropdownOpen} />
              )}
            </div>
          ) : (
            <NavLink
              to="/auth/signin"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
            >
              <User className="w-6 h-6 inline mr-1 mb-1" />
              Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
