import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const NavigationLinks = ({
  activeDropdown,
  setActiveDropdown,
  dropdownRef,
}) => {
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-gray-700 hover:text-amber-600 font-medium transition-colors ${
            isActive ? "text-amber-600" : ""
          }`
        }
      >
        Trang chủ
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `text-gray-700 hover:text-amber-600 font-medium transition-colors ${
            isActive ? "text-amber-600" : ""
          }`
        }
      >
        Thực đơn
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `text-gray-700 hover:text-amber-600 font-medium transition-colors ${
            isActive ? "text-amber-600" : ""
          }`
        }
      >
        Về chúng tôi
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `text-gray-700 hover:text-amber-600 font-medium transition-colors ${
            isActive ? "text-amber-600" : ""
          }`
        }
      >
        Liên hệ
      </NavLink>
      <div className="relative" ref={dropdownRef}>
        <button
          className="text-gray-700 hover:text-amber-600 font-medium flex items-center space-x-1 transition-colors"
          onClick={() => toggleDropdown("services")}
        >
          <span>Dịch vụ</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {activeDropdown === "services" && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <NavLink
              to="/reservation"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Đặt bàn
            </NavLink>
            <NavLink
              to="/takeaway"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Mang đi
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationLinks;
