import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";
import userService from "../../services/userService";
import { getUserReservations } from "../../services/reservationService";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileInfo from "../../components/profile/TabProfile";
import ProfileHistory from "../../components/profile/TabHistory";
import ProfileFavorites from "../../components/profile/TabFavorites";
import ProfileAchievements from "../../components/profile/TabAchievements";
import ProfileSettings from "../../components/profile/TabSettings";
const API = import.meta.env.VITE_API_URL;

import { useDispatch } from "react-redux";
import { updateUser } from "../../stores/authSlice";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [editData, setEditData] = useState({
    UserId: profileData?.user_id || "",
    username: profileData?.username || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    birth: profileData?.birth || "",
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const { getProfile } = useUser();
  const fileInputRef = useRef(null);
  const id = profileData?.user_id;
  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getProfile({ accessToken });
      if (user) {
        setProfileData(user);
        setEditData(user);
      }
    };
    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const res = await getUserReservations(id, accessToken);
        setHistoryData(res?.data || []);
      } catch (err) {
        err;
        toast.error("Không thể tải lịch sử đặt bàn");
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchProfile();
    if (activeTab === "history") {
      fetchHistory();
    }
  }, [activeTab]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await userService.updateAvatar(formData, accessToken);
      toast.success("Cập nhật ảnh đại diện thành công!");
      const updated = await getProfile({ accessToken });
      dispatch(updateUser(updated));

      setProfileData(updated);
    } catch (err) {
      err;
      toast.error("Cập nhật ảnh thất bại");
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await userService.updateUser(editData, accessToken);
        const updated = await await getProfile({ accessToken });
        dispatch(updateUser(updated));
        setProfileData(updated);
        toast.success("Cập nhật thông tin thành công!");
      } catch (err) {
        err;
        toast.error("Cập nhật thất bại");
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const avatarUrl = profileData?.avatar?.startsWith("http")
    ? profileData.avatar
    : `${API}${profileData?.avatar}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProfileSidebar
            profileData={profileData}
            avatarUrl={avatarUrl}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {activeTab === "profile" && (
                <ProfileInfo
                  activeTab={activeTab}
                  profileData={profileData}
                  editData={editData}
                  setEditData={setEditData}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleSave={handleEditToggle}
                  handleInputChange={handleInputChange}
                />
              )}
              {activeTab === "history" && (
                <ProfileHistory data={historyData} loading={loadingHistory} />
              )}
              {activeTab === "favorites" && <ProfileFavorites />}
              {activeTab === "achievements" && <ProfileAchievements />}
              {activeTab === "settings" && <ProfileSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
