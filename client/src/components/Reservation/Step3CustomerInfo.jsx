import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  MapPin,
  ShoppingCart,
  CreditCard,
  Loader2,
} from "lucide-react";

const Step3CustomerInfo = ({
  reservationData,
  setReservationData,
  setStep,
  tablesData,
  selectedItems,
  total,
  handleSubmit,
  isCreating,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [reservationData]);

  // Get selected table info
  const getSelectedTable = () => {
    if (!tablesData || !reservationData.table_id) return null;
    return tablesData.find(
      (table) => table.table_id === reservationData.table_id
    );
  };

  const selectedTable = getSelectedTable();

  const handleCustomerInfoChange = (field, value) => {
    setReservationData((prevState) => {
      const newState = {
        ...prevState,
        customerInfo: {
          ...prevState.customerInfo,
          [field]: value,
        },
      };

      return newState;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field]; // Completely remove the error
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { customerInfo } = reservationData;

    // Validate required fields
    if (!customerInfo?.name?.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    if (!customerInfo?.phone?.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else {
      // Clean phone number for validation
      const cleanPhone = customerInfo.phone.replace(/[\s-()]/g, "");
      if (!/^[0-9]{10,11}$/.test(cleanPhone)) {
        newErrors.phone = "Số điện thoại phải có 10-11 số";
      }
    }

    if (!customerInfo?.email?.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      // Cập nhật items vào reservationData trước khi submit
      setReservationData((prev) => ({
        ...prev,
        items: selectedItems.map((item) => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          unit_price: item.price,
          special_instructions: item.special_instructions || "",
        })),
        total_amount: total, // Cập nhật luôn tổng tiền nếu cần
      }));

      // Gọi submit sau 1 chút để đảm bảo state cập nhật xong
      setTimeout(() => {
        handleSubmit();
      }, 0);
    }

    console.log(reservationData);
  };

  const handleBack = () => {
    setStep(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Thông Tin Khách Hàng & Xác Nhận Đặt Bàn
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Customer Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Thông tin liên hệ
          </h3>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên *
            </label>
            <div
              className={`flex items-center border rounded-lg p-3 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-blue-500"
              }`}
            >
              <User className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={reservationData.customerInfo.name || ""}
                onChange={(e) =>
                  handleCustomerInfoChange("name", e.target.value)
                }
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <div
              className={`flex items-center border rounded-lg p-3 ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-blue-500"
              }`}
            >
              <Phone className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={reservationData.customerInfo.phone || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const cleanValue = value.replace(/[^\d\s-()]/g, "");
                  handleCustomerInfoChange("phone", cleanValue);
                }}
                className="w-full outline-none bg-transparent"
                maxLength={15}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div
              className={`flex items-center border rounded-lg p-3 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-blue-500"
              }`}
            >
              <Mail className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
              <input
                type="email"
                placeholder="Nhập email"
                value={reservationData.customerInfo.email || ""}
                onChange={(e) =>
                  handleCustomerInfoChange("email", e.target.value)
                }
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Special Requests Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yêu cầu đặc biệt
            </label>
            <div className="flex items-start border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
              <MessageSquare className="text-gray-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
              <textarea
                placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                value={reservationData.customerInfo.special_requests || ""}
                onChange={(e) =>
                  handleCustomerInfoChange("special_requests", e.target.value)
                }
                rows={3}
                className="w-full outline-none bg-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Reservation Summary */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tóm tắt đặt bàn
          </h3>

          {/* Reservation Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <div className="font-medium text-gray-800">
                  {formatDate(reservationData.reservation_date)}
                </div>
                <div className="text-sm text-gray-600">Ngày đặt bàn</div>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <div className="font-medium text-gray-800">
                  {reservationData.reservation_time}
                </div>
                <div className="text-sm text-gray-600">Giờ đặt bàn</div>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-500 mr-3" />
              <div>
                <div className="font-medium text-gray-800">
                  {reservationData.guest_count} khách
                </div>
                <div className="text-sm text-gray-600">Số lượng khách</div>
              </div>
            </div>

            {selectedTable && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">
                    Bàn {selectedTable.table_number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedTable.capacity} chỗ ngồi -{" "}
                    {selectedTable.location || "Khu vực chính"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {selectedItems.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <ShoppingCart className="w-5 h-5 text-blue-500 mr-2" />
                <h4 className="font-medium text-gray-800">Món đã chọn</h4>
              </div>

              <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                {selectedItems.map((item) => (
                  <div
                    key={item.menu_item_id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex-1">
                      <span className="text-gray-800">{item.name}</span>
                      <span className="text-gray-500 ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="font-medium text-gray-700">Tổng cộng:</span>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  {total.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Vui lòng đến đúng giờ đã đặt. Nếu trễ hơn
              15 phút mà không thông báo, bàn có thể được chuyển cho khách khác.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          disabled={isCreating}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isCreating}
          className="flex items-center px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              Xác nhận đặt bàn
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3CustomerInfo;
