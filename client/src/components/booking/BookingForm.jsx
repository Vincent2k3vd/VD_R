import React, { useState } from "react";
import { Calendar, Clock, Users, Utensils, Minus, Plus } from "lucide-react";

const BookingForm = ({
  formData,
  handleInputChange,
  timeSlots,
  tableTypes,
  selectedTable,
  setSelectedTable,
  menuItems,
  orderedItems,
  handleAddItem,
  handleRemoveItem,
  handleSubmit,
}) => {
  const [showFood, setShowFood] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-amber-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
          <Utensils className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Thông tin đặt bàn</h3>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Họ và tên *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              placeholder="Nhập họ tên của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              placeholder="0123 456 789"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            placeholder="email@example.com"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" /> Ngày *
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" /> Giờ *
            </label>
            <select
              name="time"
              required
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Chọn giờ</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" /> Số khách *
            </label>
            <select
              name="guests"
              required
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} người
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Chọn loại bàn
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tableTypes.map((table) => (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedTable === table.id
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{table.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {table.name}
                  </h4>
                  <p className="text-xs text-gray-600">{table.capacity}</p>
                  <p className="text-xs font-semibold text-amber-600">
                    {table.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Yêu cầu đặc biệt
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
            placeholder="Sinh nhật, kỷ niệm, dị ứng thực phẩm..."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showFood"
            checked={showFood}
            onChange={(e) => setShowFood(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="showFood">Đặt món ăn</label>
        </div>

        {showFood && (
          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Món ăn kèm (tùy chọn)
            </label>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 bg-red-100 hover:bg-red-200 rounded-full"
                    >
                      <Minus className="w-4 h-4 text-red-600" />
                    </button>
                    <span className="w-6 text-center">
                      {orderedItems[item.id] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddItem(item.id)}
                      className="p-1 bg-green-100 hover:bg-green-200 rounded-full"
                    >
                      <Plus className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Đặt Bàn Ngay
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
