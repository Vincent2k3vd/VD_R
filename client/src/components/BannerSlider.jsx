import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Utensils,
  Calendar,
  Users,
  Star,
  Clock,
  UtensilsCrossed,
} from "lucide-react";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Quản Lý Nhà Hàng Thông Minh",
      subtitle: "Giải pháp toàn diện cho việc điều hành nhà hàng của bạn",
      description:
        "Hệ thống quản lý hiện đại giúp tối ưu hóa quy trình vận hành",
      icon: <Utensils className="w-16 h-16 text-white" />,
      bgGradient: "from-orange-500 via-red-500 to-pink-500",
      features: ["Quản lý menu", "Theo dõi đơn hàng", "Báo cáo doanh thu"],
    },
    {
      id: 2,
      title: "Đăng Món Ăn Dễ Dàng",
      subtitle: "Cập nhật menu và món ăn chỉ trong vài giây",
      description:
        "Thêm, sửa, xóa món ăn với giao diện thân thiện và trực quan",
      icon: <UtensilsCrossed className="w-16 h-16 text-white" />,
      bgGradient: "from-green-500 via-teal-500 to-blue-500",
      features: ["Upload hình ảnh", "Quản lý giá cả", "Phân loại món ăn"],
    },
    {
      id: 3,
      title: "Đặt Bàn Thông Minh",
      subtitle: "Hệ thống đặt bàn online tiện lợi và nhanh chóng",
      description: "Khách hàng có thể đặt bàn 24/7, tối ưu hóa lượng khách",
      icon: <Calendar className="w-16 h-16 text-white" />,
      bgGradient: "from-purple-500 via-indigo-500 to-blue-600",
      features: ["Đặt bàn online", "Quản lý lịch", "Xác nhận tự động"],
    },
    {
      id: 4,
      title: "Quản Lý Khách Hàng",
      subtitle: "Theo dõi và chăm sóc khách hàng một cách tốt nhất",
      description: "Xây dựng mối quan hệ bền vững với khách hàng thân thiết",
      icon: <Users className="w-16 h-16 text-white" />,
      bgGradient: "from-pink-500 via-rose-500 to-red-500",
      features: ["Lịch sử đơn hàng", "Điểm tích lũy", "Ưu đãi cá nhân"],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-3/4 h-96 md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : index < currentSlide
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between h-full px-8 md:px-16">
                <div className="text-white max-w-2xl">
                  <div className="mb-6 animate-bounce">{slide.icon}</div>

                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  <h2 className="text-lg md:text-xl mb-4 opacity-90">
                    {slide.subtitle}
                  </h2>

                  <p className="text-sm md:text-base mb-6 opacity-80 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {slide.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Khám Phá Ngay
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-6xl text-white opacity-80">
                          {React.cloneElement(slide.icon, {
                            className: "w-24 h-24",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default BannerSlider;
