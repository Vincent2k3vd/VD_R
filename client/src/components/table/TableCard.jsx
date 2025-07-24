import React from "react";
import { Users, MapPin, Star, CheckCircle2 } from "lucide-react";

/**
 * Card hiển thị bàn đơn
 */
const TableCard = ({ table, isSelected, onSelect, config }) => {
  const IconComponent = config.icon;

  return (
    <div
      onClick={() => onSelect(table)}
      role="button"
      className={`relative p-4  border-2 rounded-xl transition-all cursor-pointer hover:shadow-lg group ${
        isSelected
          ? config.selectedColor
          : `${config.bgColor} ${config.borderColor} hover:border-opacity-60`
      }`}
    >
      {table.recommended && (
        <div className="absolute -top-2 right-[40%] bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          Đề xuất
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <IconComponent className={`w-5 h-5 ${config.textColor}`} />
          <span className="font-semibold text-gray-800 text-xs">
            Bàn {table.table_number}
          </span>
          {table.location && (
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              {table.location}
            </div>
          )}
        </div>
        {isSelected && <CheckCircle2 className="w-5 h-5 text-green-600" />}
      </div>

      <div className="flex justify-between">
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-gray-600 font-bold">
            <Users className="w-4 h-4 mr-1" />
            {table.capacity} chỗ ngồi
          </div>
          <div className={`text-xs ${config.textColor} font-medium`}>
            {table.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
