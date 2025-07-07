import React from "react";
import ImageSlider from "../components/common/ImageSlider";

const Home = () => {
  return (
    <>
      <div className="flex justify-center">
        <ImageSlider />
      </div>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Your page content goes here */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Chào mừng đến với RestaurantPro
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Trải nghiệm ẩm thực đáng nhớ với dịch vụ tốt nhất
            </p>
          </div>

          {/* Demo content sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Thực đơn đa dạng</h3>
              <p className="text-gray-600">
                Hơn 200 món ăn từ Á đến Âu, phù hợp mọi khẩu vị
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Đặt bàn dễ dàng</h3>
              <p className="text-gray-600">
                Hệ thống đặt bàn trực tuyến nhanh chóng, tiện lợi
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Giao hàng tận nơi</h3>
              <p className="text-gray-600">
                Dịch vụ giao hàng nhanh chóng trong bán kính 5km
              </p>
            </div>
          </div>

          {/* Additional content sections for scrolling demo */}
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((section) => (
              <div key={section} className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Phần {section}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
