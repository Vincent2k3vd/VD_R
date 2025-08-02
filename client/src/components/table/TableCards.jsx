import React from "react";
import clsx from "clsx";

const statusColors = {
  available: "bg-green-100 text-green-700",
  reserved: "bg-yellow-100 text-yellow-700",
  unavailable: "bg-red-100 text-red-700",
};

const TableCard = ({
  table,
  onEdit,
  onDelete,
  onChangeStatus,
  highlight = false,
}) => {
  if (!table) return null;

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus !== table.status) {
      onChangeStatus && onChangeStatus(table, selectedStatus);
    }
  };

  return (
    <div
      className={clsx(
        "rounded-xl shadow-md p-4 border transition hover:shadow-lg",
        highlight ? "border-green-500 ring-2 ring-green-300" : "bg-white"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-800">
          Bàn {table.table_number}
        </h3>
        <select
          value={table.status}
          onChange={handleStatusChange}
          className={clsx(
            "text-xs px-2 py-1 rounded-full font-medium capitalize outline-none",
            statusColors[table.status] || "bg-gray-100 text-gray-600"
          )}
        >
          <option value="available">Còn trống</option>
          <option value="reserved">Đã đặt</option>
          <option value="unavailable">Không khả dụng</option>
        </select>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>Loại:</strong> {table.table_type}
        </p>
        <p>
          <strong>Sức chứa:</strong> {table.capacity} khách
        </p>
        <p>
          <strong>Vị trí:</strong> {table.location}
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        {onEdit && (
          <button onClick={onEdit} className="text-blue-600 hover:underline">
            Sửa
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="text-red-600 hover:underline">
            Xoá
          </button>
        )}
      </div>

      {highlight && (
        <div className="mt-2 text-green-600 text-sm">✅ Gợi ý phù hợp</div>
      )}
    </div>
  );
};

export default TableCard;
