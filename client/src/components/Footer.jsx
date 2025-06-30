import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Star,
  Heart,
  ArrowUp,
} from "lucide-react";

import Logo from "../assets/Logo.png";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img src={Logo} alt="Logo" className="rounded-xs" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">VD Restaurent</h3>
                  <p className="text-gray-400 text-sm">Quản lý & Đặt bàn</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Nhà hàng hàng đầu với không gian sang trọng, món ăn đặc sắc và
                dịch vụ tận tâm. Mang đến trải nghiệm ẩm thực đáng nhớ cho mọi
                khách hàng.
              </p>
              <div className="flex items-center space-x-2 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
                <span className="text-gray-300 ml-2">
                  4.8/5 (2,847 đánh giá)
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Liên kết nhanh
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Thực đơn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Đặt bàn trực tuyến
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Đặt món mang về
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Ưu đãi đặc biệt
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-amber-400 transition-colors hover:translate-x-1 transform duration-200 block"
                  >
                    Tin tức & Sự kiện
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Thông tin liên hệ
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Đường ABC, Quận 1</p>
                    <p className="text-gray-300">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-gray-300">Hotline: 1900-1234</p>
                    <p className="text-gray-400 text-sm">Mở cửa 24/7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <p className="text-gray-300">info@restaurantpro.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-gray-300">T2-CN: 10:00 - 22:00</p>
                    <p className="text-gray-400 text-sm">Phục vụ cả ngày lễ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-amber-400">
                Kết nối với chúng tôi
              </h4>
              <p className="text-gray-300 text-sm">
                Đăng ký nhận tin tức và ưu đãi đặc biệt từ VD Restaurent
              </p>
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-amber-400 text-white placeholder-gray-400"
                  />
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 rounded-r-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium">
                    Đăng ký
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">Theo dõi chúng tôi:</p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors transform hover:scale-110 duration-200"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-110 duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors transform hover:scale-110 duration-200"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <p>&copy; 2025 VD Restaurent. Tất cả quyền được bảo lưu.</p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Chính sách bảo mật
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Điều khoản dịch vụ
                  </a>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Chính sách đổi trả
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Made with love in Vietnam</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-full shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
