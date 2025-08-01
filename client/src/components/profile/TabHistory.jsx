import React from "react";
import { History } from "lucide-react";

const TabHistory = ({ data, loading }) => {
  if (loading) return <p>Đang tải lịch sử...</p>;
  if (!data?.data?.length) return <p>Chưa có lịch sử đặt bàn.</p>;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Lịch sử đặt bàn</h2>
            <p className="text-blue-100 mt-1">
              Danh sách các lượt đặt bàn trước đây
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <History className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {data.data.map((reservation) => (
          <div
            key={reservation.reservation_id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
          >
            <p>
              <strong>Mã đặt bàn:</strong> #{reservation.reservation_id}
            </p>
            <p>
              <strong>Thời gian:</strong> {reservation.reservation_date} lúc{" "}
              {reservation.reservation_time}
            </p>
            <p>
              <strong>Số khách:</strong> {reservation.guest_count}
            </p>
            <p>
              <strong>Bàn:</strong>{" "}
              {reservation.tables.map((t) => t.table_number).join(", ")}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {Number(reservation.total_amount).toLocaleString()}đ
            </p>
            {reservation.special_requests && (
              <p>
                <strong>Ghi chú:</strong> {reservation.special_requests}
              </p>
            )}
            <p>
              <strong>Trạng thái:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                  reservation.status === "pending"
                    ? "bg-yellow-500"
                    : reservation.status === "confirmed"
                    ? "bg-green-600"
                    : reservation.status === "cancelled"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {reservation.status}
              </span>
            </p>

            {/* Hiển thị món ăn đã đặt */}
            {reservation.items?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-1">Món đã đặt:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {reservation.items.map((item, index) => (
                    <li key={index}>
                      {item.menu_item_name} - SL: {item.quantity} - Giá:{" "}
                      {Number(item.unit_price).toLocaleString()}đ
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabHistory;
