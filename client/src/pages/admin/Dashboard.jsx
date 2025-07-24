import React, { useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  ChefHat,
  Table,
  Star,
  Menu,
  Bell,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dữ liệu mẫu
  const stats = [
    {
      title: "Doanh thu hôm nay",
      value: "15.2M VND",
      icon: DollarSign,
      change: "+12%",
      color: "bg-green-500",
    },
    {
      title: "Đơn hàng",
      value: "145",
      icon: ShoppingCart,
      change: "+8%",
      color: "bg-blue-500",
    },
    {
      title: "Khách hàng",
      value: "234",
      icon: Users,
      change: "+15%",
      color: "bg-purple-500",
    },
    {
      title: "Bàn đang phục vụ",
      value: "18/24",
      icon: Table,
      change: "75%",
      color: "bg-orange-500",
    },
  ];

  // Dữ liệu biểu đồ doanh thu theo giờ
  const revenueData = [
    { hour: "6h", revenue: 2.1, orders: 8 },
    { hour: "7h", revenue: 3.8, orders: 15 },
    { hour: "8h", revenue: 5.2, orders: 22 },
    { hour: "9h", revenue: 4.1, orders: 18 },
    { hour: "10h", revenue: 6.8, orders: 28 },
    { hour: "11h", revenue: 8.9, orders: 35 },
    { hour: "12h", revenue: 12.4, orders: 48 },
    { hour: "13h", revenue: 11.2, orders: 42 },
    { hour: "14h", revenue: 9.8, orders: 38 },
    { hour: "15h", revenue: 7.2, orders: 28 },
    { hour: "16h", revenue: 8.5, orders: 32 },
    { hour: "17h", revenue: 10.8, orders: 41 },
    { hour: "18h", revenue: 14.2, orders: 52 },
    { hour: "19h", revenue: 16.8, orders: 58 },
    { hour: "20h", revenue: 15.2, orders: 55 },
    { hour: "21h", revenue: 12.8, orders: 45 },
  ];

  // Dữ liệu biểu đồ tròn cho danh mục món ăn
  const categoryData = [
    { name: "Món chính", value: 45, color: "#FF6B6B" },
    { name: "Món phụ", value: 25, color: "#4ECDC4" },
    { name: "Đồ uống", value: 20, color: "#45B7D1" },
    { name: "Tráng miệng", value: 10, color: "#FFA726" },
  ];

  // Dữ liệu biểu đồ cột cho doanh thu 7 ngày
  const weeklyData = [
    { day: "T2", revenue: 12.5, target: 15 },
    { day: "T3", revenue: 18.2, target: 15 },
    { day: "T4", revenue: 16.8, target: 15 },
    { day: "T5", revenue: 22.1, target: 15 },
    { day: "T6", revenue: 28.5, target: 15 },
    { day: "T7", revenue: 35.2, target: 15 },
    { day: "CN", revenue: 31.8, target: 15 },
  ];

  // Dữ liệu thời gian cao điểm
  const peakHoursData = [
    { time: "11h-12h", customers: 85, capacity: 100 },
    { time: "12h-13h", customers: 95, capacity: 100 },
    { time: "18h-19h", customers: 88, capacity: 100 },
    { time: "19h-20h", customers: 92, capacity: 100 },
  ];

  const recentOrders = [
    {
      id: "#001",
      table: "Bàn 5",
      items: "2 món",
      total: "450K",
      status: "Đang chuẩn bị",
      time: "10:30",
    },
    {
      id: "#002",
      table: "Bàn 12",
      items: "4 món",
      total: "780K",
      status: "Đã hoàn thành",
      time: "10:25",
    },
    {
      id: "#003",
      table: "Bàn 3",
      items: "1 món",
      total: "250K",
      status: "Đang phục vụ",
      time: "10:20",
    },
    {
      id: "#004",
      table: "Bàn 8",
      items: "3 món",
      total: "620K",
      status: "Đang chuẩn bị",
      time: "10:15",
    },
  ];

  const topDishes = [
    { name: "Phở Bò Tái", orders: 28, revenue: "1.4M VND" },
    { name: "Cơm Gà Xối Mỡ", orders: 22, revenue: "1.1M VND" },
    { name: "Bánh Mì Thịt Nướng", orders: 19, revenue: "570K VND" },
    { name: "Chả Cá Lã Vọng", orders: 15, revenue: "1.2M VND" },
  ];

  const menuItems = [
    { title: "Tổng quan", icon: BarChart3, key: "overview" },
    { title: "Đơn hàng", icon: ShoppingCart, key: "orders" },
    { title: "Thực đơn", icon: ChefHat, key: "menu" },
    { title: "Bàn ăn", icon: Table, key: "tables" },
    { title: "Khách hàng", icon: Users, key: "customers" },
    { title: "Báo cáo", icon: PieChart, key: "reports" },
    { title: "Cài đặt", icon: Settings, key: "settings" },
  ];

  const StatusBadge = ({ status }) => {
    const colors = {
      "Đang chuẩn bị": "bg-yellow-100 text-yellow-800",
      "Đã hoàn thành": "bg-green-100 text-green-800",
      "Đang phục vụ": "bg-blue-100 text-blue-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-xl text-gray-800">
                RestaurantOS
              </span>
            )}
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                activeTab === item.key
                  ? "bg-orange-50 border-r-4 border-orange-500 text-orange-600"
                  : "text-gray-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">{item.title}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Doanh thu theo giờ
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Doanh thu (triệu VND)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3B82F6"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3B82F6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          }}
                          formatter={(value) => [`${value}M VND`, "Doanh thu"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#revenueGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Pie Chart */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phân bố danh mục món ăn
                    </h3>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          dataKey="value"
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          innerRadius={60}
                          paddingAngle={5}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                          formatter={(value) => [`${value}%`, "Tỷ lệ"]}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) => (
                            <span
                              style={{ color: entry.color, fontWeight: 500 }}
                            >
                              {value}
                            </span>
                          )}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Revenue Bar Chart */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Doanh thu 7 ngày qua
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Thực tế</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            Mục tiêu
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyData} barGap={10}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                        <YAxis stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                          formatter={(value, name) => [
                            `${value}M VND`,
                            name === "revenue" ? "Doanh thu" : "Mục tiêu",
                          ]}
                        />
                        <Bar
                          dataKey="target"
                          fill="#E5E7EB"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Peak Hours Chart */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Giờ cao điểm
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {peakHoursData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.customers}/{item.capacity} khách
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-500"
                                style={{
                                  width: `${
                                    (item.customers / item.capacity) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {Math.round(
                                (item.customers / item.capacity) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini trend chart */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={revenueData.slice(-8)}>
                          <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#F59E0B"
                            strokeWidth={3}
                            dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                            activeDot={{
                              r: 6,
                              stroke: "#F59E0B",
                              strokeWidth: 2,
                            }}
                          />
                          <XAxis dataKey="hour" hide />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                            formatter={(value) => [
                              `${value} đơn`,
                              "Số đơn hàng",
                            ]}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Đơn hàng gần đây
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <ShoppingCart className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {order.id} - {order.table}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.items} • {order.total}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={order.status} />
                            <p className="text-xs text-gray-500 mt-1">
                              {order.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Dishes */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Món ăn bán chạy
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {topDishes.map((dish, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <ChefHat className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {dish.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {dish.orders} đơn hàng
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {dish.revenue}
                            </p>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">
                                4.8
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thao tác nhanh
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tạo đơn hàng</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    <Table className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Quản lý bàn</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    <ChefHat className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Thêm món mới</p>
                  </button>
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                    <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Xem báo cáo</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tính năng đang phát triển
              </h3>
              <p className="text-gray-600">
                Phần {menuItems.find((item) => item.key === activeTab)?.title}{" "}
                sẽ được cập nhật trong phiên bản tiếp theo.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
