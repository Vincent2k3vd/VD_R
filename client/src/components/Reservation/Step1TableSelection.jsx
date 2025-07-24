import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Coffee,
} from "lucide-react";
import { recommendTables } from "../../utils/recommendTables";
import TableCard from "../../components/table/TableCard";
import CombinationCard from "../../components/table/CombinationCard";
import TABLE_TYPE_CONFIG from "../../config/tableTypesConfig";

const Step1TableSelection = ({
  reservationData,
  setReservationData,
  setStep,
  tablesData,
  tablesLoading,
}) => {
  const [selectedTable, setSelectedTable] = useState(reservationData.table_id);
  const [selectedCombination, setSelectedCombination] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [recommended, setRecommended] = useState({
    single: [],
    combinations: [],
  });

  const cachedTablesData = useRef(null);

  // Time slots for reservation
  const timeSlots = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  // Guest count options
  const guestCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20];

  useEffect(() => {
    // Nếu tablesData có dữ liệu, lưu lại
    if (Array.isArray(tablesData) && tablesData.length > 0) {
      cachedTablesData.current = tablesData;
    }

    // Nếu rỗng mà có dữ liệu cache => dùng lại cache
    const dataToUse =
      Array.isArray(tablesData) && tablesData.length > 0
        ? tablesData
        : cachedTablesData.current;

    if (dataToUse && reservationData.guest_count > 0) {
      const result = recommendTables(dataToUse, reservationData.guest_count);
      setRecommended(result);
    }
  }, [tablesData, reservationData.guest_count]);

  // ✅ Dùng dữ liệu đã được xử lý trong useEffect
  const filteredRecommendations = useMemo(() => {
    const { single, combinations } = recommended;

    if (activeFilter === "all") {
      return { single, combinations };
    }

    const filteredSingle = single.filter(
      (table) => table.table_type === activeFilter
    );
    const filteredCombinations = combinations.filter((combo) =>
      combo.tables.some((table) => table.table_type === activeFilter)
    );

    return { single: filteredSingle, combinations: filteredCombinations };
  }, [recommended, activeFilter]);

  const handleInputChange = (field, value) => {
    setReservationData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleTableSelect = (selection) => {
    if (selection.type === "single") {
      setSelectedTable(selection.table_id);
      setSelectedCombination(null);
      setReservationData((prev) => ({
        ...prev,
        table_id: [selection.table_id],
        table_combination: null,
      }));
    } else {
      setSelectedTable(null);
      setSelectedCombination(selection.id);
      setReservationData((prev) => ({
        ...prev,
        table_id: null,
        table_combination: selection.tables.map((t) => t.table_id),
      }));
    }

    if (errors.table_id) {
      setErrors((prev) => ({ ...prev, table_id: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!reservationData.reservation_date) {
      newErrors.reservation_date = "Vui lòng chọn ngày đặt bàn";
    }

    if (!reservationData.reservation_time) {
      newErrors.reservation_time = "Vui lòng chọn giờ đặt bàn";
    }

    if (!selectedTable && !selectedCombination) {
      newErrors.table_id = "Vui lòng chọn bàn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Chọn Bàn & Thời Gian
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Date, Time, Guest Count */}
        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Ngày đặt bàn *
            </label>
            <input
              type="date"
              value={reservationData.reservation_date}
              onChange={(e) =>
                handleInputChange("reservation_date", e.target.value)
              }
              min={getMinDate()}
              max={getMaxDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.reservation_date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.reservation_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reservation_date}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              Giờ đặt bàn *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleInputChange("reservation_time", time)}
                  className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                    reservationData.reservation_time === time
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.reservation_time && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reservation_time}
              </p>
            )}
          </div>

          {/* Guest Count Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 w-auto">
              <Users className="w-4 h-4 mr-2" />
              Số lượng khách
            </label>
            <select
              value={reservationData.guest_count}
              onChange={(e) =>
                handleInputChange("guest_count", parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {guestCounts.map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "khách" : "khách"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column - Table Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Chọn bàn ({reservationData.guest_count} khách) *
            </h3>
          </div>

          {/* Table Type Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                activeFilter === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {Object.entries(TABLE_TYPE_CONFIG).map(([type, config]) => {
              const IconComponent = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                    activeFilter === type
                      ? `${config.selectedColor} text-white`
                      : `${config.bgColor} ${config.textColor} hover:${config.borderColor}`
                  }`}
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {config.name}
                </button>
              );
            })}
          </div>

          {tablesLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">
                Đang tải danh sách bàn...
              </span>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-4">
              {/* Single Tables */}
              {filteredRecommendations.single.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Coffee className="w-4 h-4 mr-1" />
                    Bàn đơn lẻ
                  </h4>
                  <div className="grid grid-cols-2 gap-3 w-auto">
                    {filteredRecommendations.single.slice(0, 6).map((table) => (
                      <TableCard
                        key={table.table_id}
                        table={table}
                        isSelected={selectedTable === table.table_id}
                        onSelect={handleTableSelect}
                        config={TABLE_TYPE_CONFIG[table.table_type]}
                        showEfficiency={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Table Combinations */}
              {filteredRecommendations.combinations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Ghép bàn ({reservationData.guest_count} khách)
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {filteredRecommendations.combinations
                      .slice(0, 3)
                      .map((combination) => (
                        <CombinationCard
                          key={combination.id}
                          combination={combination}
                          isSelected={selectedCombination === combination.id}
                          onSelect={handleTableSelect}
                          config={
                            TABLE_TYPE_CONFIG[
                              combination.tables?.[0]?.table_type
                            ]
                          }
                        />
                      ))}
                  </div>
                </div>
              )}

              {filteredRecommendations.single.length === 0 &&
                filteredRecommendations.combinations.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-2">
                      Không có bàn phù hợp
                    </div>
                    <p className="text-sm text-gray-400">
                      Vui lòng thử chọn số lượng khách khác hoặc thời gian khác
                    </p>
                  </div>
                )}
            </div>
          )}

          {errors.table_id && (
            <p className="text-red-500 text-sm mt-2">{errors.table_id}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Tiếp theo
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Step1TableSelection;
