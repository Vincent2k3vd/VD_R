import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  Phone,
  ChefHat,
  Users,
  Award,
  Heart,
} from "lucide-react";
import ImageSlider from "../../components/common/ImageSlider";
import { useMenuList } from "../../hooks/useMenuItem";

const HomePage = () => {
  const { data, loading } = useMenuList({
    page: 1,
    limit: 8,
    is_available: true,
  });

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Nhà hàng được yêu thích #1 tại TP.HCM
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Trải nghiệm
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  {" "}
                  ẩm thực{" "}
                </span>
                đỉnh cao
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Khám phá hương vị độc đáo từ những món ăn được chế biến bởi đội
                ngũ đầu bếp chuyên nghiệp với nguyên liệu tươi ngon nhất.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg">
                  Đặt bàn ngay
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all">
                  Xem thực đơn
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15K+</div>
                  <div className="text-sm text-gray-600">
                    Khách hàng hài lòng
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">
                    Đánh giá trung bình
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">200+</div>
                  <div className="text-sm text-gray-600">Món ăn đa dạng</div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="w-full h-110 bg-gradient-to-br rounded-3xl shadow-2xl overflow-hidden">
                <ImageSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn VD_Restaurant?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm ẩm thực tuyệt vời nhất với
              dịch vụ chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <ChefHat className="w-8 h-8" />,
                title: "Đầu bếp chuyên nghiệp",
                desc: "Đội ngũ đầu bếp giàu kinh nghiệm với hơn 10 năm trong nghề",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Phục vụ nhanh chóng",
                desc: "Cam kết phục vụ trong 15 phút tại nhà hàng, giao hàng 30 phút",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Nguyên liệu tươi ngon",
                desc: "100% nguyên liệu tươi sống, được chọn lọc kỹ càng mỗi ngày",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Dịch vụ tận tâm",
                desc: "Đội ngũ nhân viên nhiệt tình, chu đáo, luôn lắng nghe khách hàng",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Vị trí thuận lợi",
                desc: "5 chi nhánh tại các vị trí đắc địa, dễ dàng di chuyển",
                color: "from-purple-500 to-violet-500",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Chất lượng đảm bảo",
                desc: "Được chứng nhận HACCP và các tiêu chuẩn an toàn thực phẩm",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Thực đơn nổi bật
            </h2>
            <p className="text-xl text-gray-600">
              Khám phá những món ăn được yêu thích nhất tại VD_Restaurant
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-600 text-lg">
              Đang tải món ăn...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.data?.map((item) => (
                <div
                  key={item.menu_item_id}
                  className="group hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.item_name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.item_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="text-amber-600 font-semibold">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to={"/menu"}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Xem thực đơn đầy đủ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
