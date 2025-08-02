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
      title: "Ẩm Thực Đỉnh Cao Tại VD_Restaurant",
      subtitle: "Hương vị tinh tế từ những nguyên liệu tươi ngon nhất",
      description:
        "Khám phá thực đơn phong phú được chế biến bởi các đầu bếp hàng đầu trong không gian ấm cúng và hiện đại.",
      icon: <Utensils className="w-16 h-16 text-white" />,
      bgGradient: "from-red-400 via-orange-500 to-yellow-500",
      features: [
        "Món Á & Âu",
        "Không gian sang trọng",
        "Nguyên liệu tươi mỗi ngày",
      ],
    },
    {
      id: 2,
      title: "Không Gian Lý Tưởng Cho Mọi Dịp",
      subtitle: "Tổ chức tiệc – Hẹn hò – Gặp gỡ đối tác",
      description:
        "Từ bữa tối lãng mạn đến tiệc sinh nhật hoặc sự kiện công ty, VD_Restaurant luôn là lựa chọn lý tưởng với không gian đa dạng và dịch vụ chuyên nghiệp.",
      icon: <Users className="w-16 h-16 text-white" />,
      bgGradient: "from-indigo-500 via-purple-500 to-pink-500",
      features: ["Phòng riêng", "Trang trí theo yêu cầu", "Hỗ trợ sự kiện"],
    },
    {
      id: 3,
      title: "Đặt Bàn Dễ Dàng – Trải Nghiệm Tuyệt Vời",
      subtitle: "Đặt chỗ trước giúp bạn luôn có chỗ ngồi yêu thích",
      description:
        "Đặt bàn online nhanh chóng chỉ với vài thao tác. Đội ngũ lễ tân của chúng tôi sẽ chuẩn bị chỗ ngồi tốt nhất cho bạn.",
      icon: <Calendar className="w-16 h-16 text-white" />,
      bgGradient: "from-green-500 via-teal-500 to-blue-500",
      features: [
        "Đặt bàn online 24/7",
        "Xác nhận qua SMS/Email",
        "Chọn bàn theo sở thích",
      ],
    },
    {
      id: 4,
      title: "Dịch Vụ 5 Sao – Phục Vụ Tận Tâm",
      subtitle:
        "Chúng tôi không chỉ phục vụ món ăn, mà còn mang đến trải nghiệm",
      description:
        "Đội ngũ phục vụ thân thiện, nhanh nhẹn luôn sẵn sàng phục vụ bạn tận tình từ lúc đến cho đến khi rời đi.",
      icon: <Star className="w-16 h-16 text-white" />,
      bgGradient: "from-yellow-500 via-amber-500 to-orange-400",
      features: [
        "Phục vụ chuyên nghiệp",
        "Phản hồi nhanh",
        "Luôn lắng nghe khách hàng",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
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
                <div className="absolute top-10 left-10 w-10 h-10 rounded-full bg-white"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between h-full px-8 md:px-16">
                <div className="text-white max-w-2xl">
                  <div className="mb-6 animate-bounce">{slide.icon}</div>

                  <h1 className="text-3xl md:text-3xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  <h2 className="text-lg md:text-xl mb-4 opacity-90">
                    {slide.subtitle}
                  </h2>

                  <p className="text-sm md:text-base mb-6 opacity-80 leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-6xl text-white opacity-80">
                          {React.cloneElement(slide.icon, {
                            className: "w-12 h-12 text-black",
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
