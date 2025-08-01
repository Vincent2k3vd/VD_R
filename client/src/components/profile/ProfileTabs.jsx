import TabProfile from "./TabProfile";
import TabHistory from "./TabHistory";
import TabFavorites from "./TabFavorites";
import TabAchievements from "./TabAchievements";
import TabSettings from "./TabSettings";

const ProfileTabs = ({
  activeTab,
  profileData,
  editData,
  setEditData,
  isEditing,
  setIsEditing,
  handleSave,
  handleInputChange,
}) => {
  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <TabProfile
            profileData={profileData}
            editData={editData}
            setEditData={setEditData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
            handleInputChange={handleInputChange}
          />
        );
      case "history":
        return <TabHistory />;
      case "favorites":
        return <TabFavorites />;
      case "achievements":
        return <TabAchievements />;
      case "settings":
        return <TabSettings />;
      default:
        return null;
    }
  };

  return <div className="w-full lg:w-3/4">{renderTab()}</div>;
};

export default ProfileTabs;
