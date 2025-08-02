import React, { useEffect, useState } from "react";
import {
  getAllReservations,
  deleteReservation,
  updateReservationStatus,
} from "../../services/reservationService";
import Button from "../ui/Button/Button";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Calendar,
  Clock,
  Users,
  Phone,
  CreditCard,
  MapPin,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AdminReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters] = useState({ page: 1, limit: 10 });
  const [expandedItems, setExpandedItems] = useState(new Set());

  const statusButtons = [
    {
      label: "Hoàn thành",
      status: "completed",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      variant: "",
    },
    {
      label: "Xác nhận",
      status: "confirmed",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      variant: "primary",
    },
    {
      label: "Hủy",
      status: "cancelled",
      icon: <XCircle className="w-4 h-4 mr-1" />,
      variant: "danger",
    },
  ];

  useEffect(() => {
    fetchReservations();
  }, [filters]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await getAllReservations(filters);
      setReservations(res.data || []);
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá đơn này?")) return;
    try {
      await deleteReservation(id);
      fetchReservations();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateReservationStatus(id, newStatus);

      setReservations((prev) => ({
        ...prev,
        data: prev.data.map((r) =>
          r.reservation_id === id ? { ...r, status: newStatus } : r
        ),
      }));
    } catch (err) {
      console.error("Update status failed:", err);
    }
  };

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Chờ xác nhận",
        color: "bg-yellow-100 text-yellow-800",
      },
      confirmed: { label: "Đã xác nhận", color: "bg-green-100 text-green-800" },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
      completed: { label: "Hoàn thành", color: "bg-blue-100 text-blue-800" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header đơn giản */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý đơn đặt bàn
          </h1>
          <p className="text-gray-600">
            Tổng:{" "}
            <span className="font-semibold">
              {reservations.data?.length || 0}
            </span>{" "}
            đơn
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.data?.map((r) => {
              const isExpanded = expandedItems.has(r.reservation_id);

              return (
                <div
                  key={r.reservation_id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thông tin cơ bản - luôn hiển thị */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      {/* Thông tin chính */}
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                              #{r.reservation_id}
                            </h3>
                            {getStatusBadge(r.status)}
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {r.user?.username}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(r.reservation_date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {r.reservation_time}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {r.guest_count} người
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {r.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tổng tiền và actions */}
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            {Number(r.total_amount).toLocaleString()}đ
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleExpanded(r.reservation_id)}
                          >
                            {isExpanded ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-1" />
                                Ẩn
                                <ChevronUp className="w-4 h-4 ml-1" />
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-1" />
                                Chi tiết
                                <ChevronDown className="w-4 h-4 ml-1" />
                              </>
                            )}
                          </Button>

                          {statusButtons.map(
                            (btn) =>
                              r.status !== "completed" && (
                                <Button
                                  key={btn.status}
                                  variant={btn.variant}
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      r.reservation_id,
                                      btn.status
                                    )
                                  }
                                >
                                  {btn.icon}
                                  {btn.label}
                                </Button>
                              )
                          )}

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDelete(r.reservation_id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Xoá
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chi tiết đầy đủ - chỉ hiển thị khi expand */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Thông tin liên hệ */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            Thông tin liên hệ
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Tên khách hàng:
                              </span>
                              <p className="font-medium">{r.user?.username}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <p className="font-medium">{r.user?.email}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Số điện thoại:
                              </span>
                              <p className="font-medium">{r.phone}</p>
                            </div>
                          </div>
                        </div>

                        {/* Chi tiết đặt bàn */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-green-600" />
                            Chi tiết đặt bàn
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Ngày đặt:</span>
                              <p className="font-medium">
                                {new Date(
                                  r.reservation_date
                                ).toLocaleDateString("vi-VN")}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Giờ đặt:</span>
                              <p className="font-medium">
                                {r.reservation_time}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Số khách:</span>
                              <p className="font-medium">
                                {r.guest_count} người
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Bàn số:</span>
                              <p className="font-medium">
                                {r.reservation_tables
                                  ?.map((t) => t.table?.table_number)
                                  .join(", ") || "Chưa chọn"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Thông tin đơn hàng */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                            Đơn hàng
                          </h4>
                          <div className="space-y-2 text-sm">
                            {r.items?.map((item, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>
                                  Món {item.menu_item_id} (x{item.quantity})
                                </span>
                                <span className="font-medium">
                                  {Number(
                                    item.unit_price * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </span>
                              </div>
                            ))}
                            <div className="border-t pt-2 mt-3">
                              <div className="flex justify-between font-semibold text-green-600">
                                <span>Tổng cộng:</span>
                                <span>
                                  {Number(r.total_amount).toLocaleString()}đ
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {(!reservations.data || reservations.data.length === 0) && (
              <div className="bg-white rounded-lg p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có đơn đặt bàn
                </h3>
                <p className="text-gray-500">
                  Các đơn đặt bàn sẽ hiển thị tại đây khi có khách hàng đặt bàn.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservation;
