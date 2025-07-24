import React from "react";
import { Users, Sparkles, Star, CheckCircle2 } from "lucide-react";

/**
 * Card hiển thị tổ hợp ghép bàn
 */
const CombinationCard = ({ combination, isSelected, onSelect, config }) => {
  const IconComponent = config.icon;

  return (
    <div
      onClick={() => onSelect(combination)}
      role="button"
      className={`relative p-4 border-2 rounded-xl transition-all cursor-pointer hover:shadow-lg ${
        isSelected
          ? "border-purple-500 bg-purple-50"
          : "border-purple-200 bg-purple-25 hover:border-purple-300"
      }`}
    >
      {combination.recommended && (
        <div className="absolute -top-2 right-[40%] bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 mr-1" />
          Đề xuất
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-800">Ghép bàn</span>
        </div>
        {isSelected && <CheckCircle2 className="w-5 h-5 text-green-600" />}
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          {combination.tables.map((t) => `Bàn ${t.table_number}`).join(" + ")}
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="w-4 h-4 mr-1" />
          Tổng: {combination.totalCapacity} chỗ ngồi
        </div>

        <div className="text-xs text-purple-600 font-medium">
          Phù hợp: {Math.round(combination.efficiency * 100)}%
        </div>
      </div>
    </div>
  );
};

export default CombinationCard;
