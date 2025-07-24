// File: components/header/MainNavigation.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import NavigationLinks from "./NavigationLinks";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { Calendar, ShoppingCart, UserCircle, Menu } from "lucide-react";

import { useSelector } from "react-redux";

const MainNavigation = ({
  activeDropdown,
  setActiveDropdown,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const reduxUser = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
      <div className="flex justify-between items-center h-20">
        <Link to="/">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <img src={Logo} alt="Logo" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                VD Restaurant
              </h1>
              <p className="text-xs text-gray-500">Đặt bàn & Đặt món mang về</p>
            </div>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-amber-600 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-7 h-7" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationLinks
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          {reduxUser ? (
            <Link
              to="/reservation"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Đặt bàn ngay</span>
            </Link>
          ) : (
            <button
              onClick={() => alert("Vui lòng đăng nhập để đặt bàn.")}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-md cursor-not-allowed"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Đặt bàn ngay</span>
            </button>
          )}

          <button className="relative flex items-center justify-center p-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:text-orange-600 shadow-sm hover:shadow-md transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

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
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
