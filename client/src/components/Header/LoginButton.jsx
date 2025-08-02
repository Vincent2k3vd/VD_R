import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const LoginButton = () => (
  <NavLink
    to="/auth/signin"
    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
  >
    <User className="w-4 h-4 inline mr-2 mb-1" />
    Đăng nhập
  </NavLink>
);

export default LoginButton;
