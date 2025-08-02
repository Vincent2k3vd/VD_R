import React, { useEffect, useState } from "react";
import {
  fetchALLTables,
  fetchTableStatus,
  fetchTableStats,
  findGuestCount,
  fetchTablesRecoment,
  createTable,
  updateTable,
  deleteTable,
  updateTableStatus,
} from "../../services/tableService";
import { Loader, Users, Lightbulb, Plus } from "lucide-react";
import TableCard from "../../components/table/TableCards";

const AdminTableManager = () => {
  const [tables, setTables] = useState([]);
  const [alltables, setallTables] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [guestCount, setGuestCount] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [newTable, setNewTable] = useState({
    table_number: "",
    capacity: 4,
    location: "",
    table_type: "standard",
    status: "available",
  });

  useEffect(() => {
    loadStats();
    loadTables();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetchTableStats();
      setStats(res.data.data?.byStatus || {});
    } catch (err) {
      console.error("Error fetching table stats:", err);
    }
  };

  const loadTables = async () => {
    setLoading(true);
    try {
      const res = await fetchALLTables();
      setTables(res.data.data);
      setallTables(res.data.data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByStatus = async (status) => {
    setStatusFilter(status);
    setLoading(true);
    try {
      const res =
        status === "all"
          ? await fetchALLTables()
          : await fetchTableStatus(status);
      setTables(res.data.data);
    } catch (err) {
      console.error("Error filtering by status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTable = async (table) => {
    const newCap = prompt("Nhập sức chứa mới:", table.capacity);
    if (!newCap || isNaN(newCap)) return;

    try {
      await updateTable(table.table_id, { capacity: Number(newCap) });
      loadTables();
    } catch (err) {
      console.error("Error updating table:", err);
    }
  };

  const handleSearchByGuest = async () => {
    if (!guestCount || isNaN(guestCount)) return;
    setLoading(true);
    try {
      const res = await findGuestCount(Number(guestCount));
      setTables(res.data.data);
    } catch (err) {
      console.error("Error searching by guest count:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!guestCount || isNaN(guestCount)) return;
    setLoading(true);
    try {
      const res = await fetchTablesRecoment(Number(guestCount));
      const result = res.data.data || res.data;

      setRecommended({
        single: result.single || [],
        combinations: result.combinations || [],
      });
    } catch (err) {
      console.error("Error recommending tables:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTable = async () => {
    try {
      await createTable(newTable);
      setNewTable({ table_number: "", capacity: 4, location: "" });
      loadTables();
    } catch (err) {
      console.error("Error creating table:", err);
    }
  };

  const handleDeleteTable = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá bàn này?")) return;
    try {
      await deleteTable(id);
      loadTables();
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  const handleChangeStatus = async (table, newStatus) => {
    try {
      await updateTableStatus(table.table_id, newStatus);
      loadTables();
    } catch (err) {
      console.error("Error updating table status:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý bàn nhà hàng</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Tổng số bàn</p>
          <p className="text-lg font-semibold">{alltables?.length || 0}</p>
        </div>
        <div className="bg-green-100 shadow p-4 rounded-xl">
          <p className="text-gray-500">Còn trống</p>
          <p className="text-lg font-semibold">{stats.available || 0}</p>
        </div>
        <div className="bg-yellow-100 shadow p-4 rounded-xl">
          <p className="text-gray-500">Đã đặt</p>
          <p className="text-lg font-semibold">{stats.reserved || 0}</p>
        </div>
        <div className="bg-red-100 shadow p-4 rounded-xl">
          <p className="text-gray-500">Không khả dụng</p>
          <p className="text-lg font-semibold">{stats.unavailable || 0}</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => handleFilterByStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="available">Còn trống</option>
          <option value="reserved">Đã đặt</option>
          <option value="unavailable">Không khả dụng</option>
        </select>

        <input
          type="number"
          placeholder="Số khách"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          className="p-2 border rounded-lg w-32"
        />
        <button
          onClick={handleSearchByGuest}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
        >
          <Users size={16} /> Tìm bàn
        </button>
        <button
          onClick={handleRecommend}
          className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
        >
          <Lightbulb size={16} /> Gợi ý
        </button>
      </div>

      {/* Add Table */}
      <div className="border p-4 rounded-xl bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Thêm bàn mới</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Mã bàn"
            value={newTable.table_number}
            onChange={(e) =>
              setNewTable({ ...newTable, table_number: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Sức chứa"
            value={newTable.capacity}
            onChange={(e) =>
              setNewTable({ ...newTable, capacity: Number(e.target.value) })
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Vị trí"
            value={newTable.location}
            onChange={(e) =>
              setNewTable({ ...newTable, location: e.target.value })
            }
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleCreateTable}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <Plus size={16} /> Thêm bàn
          </button>
        </div>
      </div>

      {/* Recommended Tables */}
      {(recommended.single?.length > 0 ||
        recommended.combinations?.length > 0) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Gợi ý bàn phù hợp
          </h2>

          {recommended.single?.length > 0 && (
            <>
              <p className="text-sm text-gray-600">Bàn đơn:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 mb-4">
                {recommended.single.map((table) => (
                  <TableCard key={table.table_id} table={table} highlight />
                ))}
              </div>
            </>
          )}

          {recommended.combinations?.length > 0 && (
            <>
              <p className="text-sm text-gray-600">Tổ hợp bàn:</p>
              <div className="space-y-4">
                {recommended.combinations.map((combo, idx) => (
                  <div
                    key={idx}
                    className="p-3 border rounded-xl bg-white shadow"
                  >
                    <p className="text-sm text-gray-700 mb-2">
                      Tổng sức chứa: {combo.totalCapacity} | Hiệu suất:{" "}
                      {Math.round(combo.efficiency * 100)}%
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {combo.tables.map((table) => (
                        <TableCard
                          key={table.table_id}
                          table={table}
                          highlight
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Table List */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Danh sách bàn</h2>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader className="animate-spin" />
          </div>
        ) : tables?.length === 0 ? (
          <p className="text-gray-500 mt-4">Không có bàn phù hợp.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {tables.map((table) => (
              <TableCard
                key={table.table_id}
                table={table}
                onEdit={() => handleEditTable(table)}
                onDelete={() => handleDeleteTable(table.table_id)}
                onChangeStatus={handleChangeStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTableManager;
