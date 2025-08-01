import { Shield } from "lucide-react";
const InfoField = ({
  Icon,
  label,
  name,
  type = "text",
  value,
  editValue,
  placeholder,
  isEditing,
  handleInputChange,
  disabled = false,
}) => (
  <div className="group">
    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
      {label}
      {disabled && <Shield className="w-4 h-4 text-gray-400" />}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
        {Icon && (
          <Icon
            className={`w-5 h-5 transition-colors duration-200 ${
              disabled
                ? "text-gray-300"
                : "text-gray-400 group-hover:text-blue-500"
            }`}
          />
        )}
      </div>
      {isEditing && !disabled ? (
        <input
          name={name}
          type={type}
          value={editValue || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
        />
      ) : (
        <div
          className={`w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-gray-800 transition-colors duration-200 ${
            disabled
              ? "bg-gray-100 text-gray-500"
              : "bg-gray-50 group-hover:bg-gray-100"
          }`}
        >
          {value || <span className="text-gray-400">Chưa cập nhật</span>}
          {disabled && (
            <span className="text-xs text-gray-400 ml-2">
              (Không thể chỉnh sửa)
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);

export default InfoField;
