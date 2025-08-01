import React from "react";
import { Users, MapPin, CheckCircle2, Table2 } from "lucide-react";

/**
 * Card hiển thị thông tin bàn
 */
const TableCard = ({ table, isSelected, onSelect, config = {} }) => {
  const IconComponent = config.icon || Table2;

  const selectedColor = config.selectedColor || "border-blue-600 bg-blue-50";
  const bgColor = config.bgColor || "bg-white";
  const borderColor = config.borderColor || "border-gray-300";
  const textColor = config.textColor || "text-blue-600";

  return (
    <div
      onClick={() => onSelect(table.table_id)}
      role="button"
      className={`relative p-4 border-2 rounded-xl transition-all cursor-pointer group hover:shadow-lg ${
        isSelected
          ? selectedColor
          : `${bgColor} ${borderColor} hover:border-opacity-60`
      }`}
    >
      {table.recommended && (
        <div className="absolute -top-2 right-[30%] bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          Đề xuất
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <IconComponent className={`w-5 h-5 ${textColor}`} />
          <span className="font-semibold text-gray-800 text-sm">
            Bàn {table.table_number}
          </span>
        </div>
        {isSelected && <CheckCircle2 className="w-5 h-5 text-green-600" />}
      </div>

      <div className="text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <Users className="w-4 h-4 mr-1 text-gray-500" />
          {table.capacity} chỗ ngồi
        </div>
        {table.location && (
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {table.location}
          </div>
        )}
        {table.description && (
          <div className={`mt-1 text-xs font-medium ${textColor}`}>
            {table.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCard;
