import React, { useState } from "react";
import { CalendarDays, Utensils, LayoutGrid, UserCog } from "lucide-react";
import AdminReservation from "../../components/admin/AdminReservation";
import AdminMenuManager from "../../components/admin/AdminMenu.jsx";
import AdminTableManager from "../../components/admin/AdminTableManager";
import AdminUserManager from "../../components/admin/AdminUserManager";

const NAV_ITEMS = [
  {
    key: "reservations",
    label: "Đơn đặt bàn",
    icon: <CalendarDays size={18} />,
  },
  { key: "menu", label: "Món ăn", icon: <Utensils size={18} /> },
  { key: "tables", label: "Bàn", icon: <LayoutGrid size={18} /> },
  { key: "users", label: "Người dùng", icon: <UserCog size={18} /> },
];

const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState("reservations");

  const renderContent = () => {
    switch (selectedView) {
      case "menu":
        return <AdminMenuManager />;
      case "tables":
        return <AdminTableManager />;
      case "users":
        return <AdminUserManager />;
      case "reservations":
      default:
        return <AdminReservation />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b text-xl font-bold text-blue-600">
          Admin Dashboard
        </div>
        <nav className="p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedView(item.key)}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedView === item.key
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
