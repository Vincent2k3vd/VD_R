import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  User,
  X,
} from "lucide-react";
import InfoField from "../../components/ui/Input/InfoField";

const TabProfile = ({
  profileData,
  editData = {},
  isEditing = false,
  setIsEditing = () => {},
  handleSave = () => {},
  handleInputChange = () => {},
}) => {
  const [saveStatus, setSaveStatus] = useState(null);

  const handleCancel = () => {
    setIsEditing(false);
    setSaveStatus(null);
  };

  const handleSaveWithStatus = async () => {
    setSaveStatus("saving");
    try {
      await handleSave();
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus(null);
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      error;
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const completionPercentage = () => {
    const fields = ["username", "email", "phone", "birth"];
    const completed = fields.filter((field) => profileData?.[field]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleDateChange = (e) => {
    handleInputChange({
      target: {
        name: "birth",
        value: e.target.value,
      },
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
      {/* Enhanced Header with Avatar */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar Section */}
              <div className="relative cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Thông tin cá nhân
                </h2>
                <p className="text-blue-100 mb-4">
                  Quản lý và cập nhật thông tin tài khoản của bạn
                </p>

                {/* Profile Completion Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/20 rounded-full h-2 max-w-64">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
                      style={{ width: `${completionPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-blue-100 font-semibold bg-white/10 px-3 py-1 rounded-full">
                    {completionPercentage()}% hoàn thành
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="p-8 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InfoField
            Icon={User}
            label="Tên người dùng"
            name="username"
            value={profileData?.username}
            editValue={editData?.username}
            placeholder="Nhập tên người dùng của bạn"
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />

          <InfoField
            Icon={Mail}
            label="Địa chỉ Email"
            name="email"
            type="email"
            value={profileData?.email}
            editValue={editData?.email}
            placeholder="example@domain.com"
            isEditing={false}
            disabled={true}
            handleInputChange={handleInputChange}
          />

          <InfoField
            Icon={Phone}
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={profileData?.phone}
            editValue={editData?.phone}
            placeholder="0xxx xxx xxx"
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />

          {/* Enhanced Birth Date with better styling */}
          <div className="group">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Ngày sinh
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              {isEditing ? (
                <input
                  type="date"
                  name="birth"
                  value={editData?.birth || ""}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
                />
              ) : (
                <div className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 group-hover:bg-gray-100 transition-colors duration-200">
                  {profileData?.birth ? (
                    new Date(profileData.birth).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  ) : (
                    <span className="text-gray-400">Chưa có thông tin</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Creation Date with enhanced styling */}
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Thông tin tài khoản
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <MapPin className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="w-full pl-11 pr-4 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg text-gray-800">
                <div className="flex items-center justify-between">
                  <span>
                    Tài khoản được tạo vào:{" "}
                    {profileData?.created_at
                      ? new Date(profileData.created_at).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Không có thông tin"}
                  </span>
                  <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    Xác minh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Section */}
        <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Cập nhật lần cuối:{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString("vi-VN")}
                </span>
              </span>
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={saveStatus === "saving"}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    Hủy bỏ
                  </button>
                  <button
                    onClick={handleSaveWithStatus}
                    disabled={saveStatus === "saving"}
                    className="relative flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {saveStatus === "saving" ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Lưu thay đổi
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium group transform hover:scale-105"
                >
                  <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                  Chỉnh sửa thông tin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProfile;
