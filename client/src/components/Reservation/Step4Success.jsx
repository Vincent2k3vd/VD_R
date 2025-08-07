import React from "react";
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  MapPin,
  Receipt,
  Phone,
  Mail,
  User,
} from "lucide-react";

const Step4Success = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString?.slice(0, 5) || timeString;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="text-center space-y-8">
      {/* Success Icon & Message */}
      <div className="space-y-4">
        <CheckCircle className="mx-auto text-green-500 w-20 h-20" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Đặt bàn thành công!
          </h2>
          <p className="text-gray-600 text-lg">
            Cảm ơn bạn đã đặt bàn tại nhà hàng của chúng tôi.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Mã đặt bàn:{" "}
            <span className="font-semibold text-blue-600">
              #{data?.reservation_id || data?.id}
            </span>
          </p>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Basic Reservation Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
            Thông tin đặt bàn
          </h3>
          <div className="grid gap-4 text-left">
            <div className="flex items-center">
              <Calendar className="text-blue-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Ngày:</strong> {formatDate(data?.reservation_date)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="text-blue-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Giờ:</strong> {formatTime(data?.reservation_time)}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="text-blue-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Số khách:</strong> {data?.guest_count} người
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-blue-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Bàn số:</strong> {data?.tables[0]?.table_number},{" "}
                {data?.tables[1]?.table_number}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
            Thông tin khách hàng
          </h3>
          <div className="grid gap-4 text-left">
            <div className="flex items-center">
              <User className="text-green-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Tên:</strong> {data.user.username}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="text-green-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Số điện thoại:</strong> {data.user.phone}
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="text-green-500 w-5 h-5 mr-3" />
              <span className="text-gray-700">
                <strong>Email:</strong> {data.user.email}
              </span>
            </div>
            {(data?.customerInfo?.special_requests ||
              data?.special_requests) && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Yêu cầu đặc biệt:</strong>{" "}
                  {data?.customerInfo?.special_requests ||
                    data?.special_requests}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        {data?.menuItems && data?.menuItems.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
              Món đã đặt trước
            </h3>
            <div className="space-y-3">
              {data.menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  <Receipt className="text-orange-500 w-5 h-5 mr-2" />
                  <span className="text-lg font-semibold text-gray-800">
                    Tổng cộng:
                  </span>
                </div>
                <span className="text-xl font-bold text-orange-600">
                  {formatCurrency(data?.totalAmount || data?.total)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="bg-blue-50 p-6 rounded-2xl max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Lưu ý quan trọng
        </h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Vui lòng đến đúng giờ để đảm bảo chất lượng phục vụ tốt nhất</p>
          <p>• Nếu có thay đổi, vui lòng liên hệ trước 2 giờ</p>
          <p>
            • Hotline: <span className="font-semibold">1900 1234</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          In phiếu đặt bàn
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Step4Success;
