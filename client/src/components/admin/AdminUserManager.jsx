import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { Pencil, Trash2, User, Loader } from "lucide-react";
import Button from "../ui/Button/Button";

const ROLE_OPTIONS = [
  { id: 1, label: "Admin" },
  { id: 2, label: "Nhân viên" },
  { id: 3, label: "Nhân viên phục vụ" },
  { id: 4, label: "Khách hàng" },
];

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getAllUsers();
      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.user_id !== id));
    } catch (err) {
      console.error("Lỗi xoá:", err);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      await userService.updateUserRole(userId, newRoleId);
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, role_id: newRoleId } : user
        )
      );
    } catch (err) {
      console.error("Lỗi đổi vai trò:", err);
      alert("Không thể cập nhật vai trò.");
    }
  };

  const handleUpdateUserInfo = async (user) => {
    try {
      await userService.updateUser({
        user_id: user.user_id,
        username: user.username,
        phone: user.phone,
      });

      //   dispatch(updateUser(updated));
      alert("Cập nhật thông tin thành công!");
      setEditingUserId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Quản lý người dùng
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader className="animate-spin w-6 h-6 mr-2" />
          Đang tải danh sách...
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Vai trò</th>
                <th className="p-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.user_id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {editingUserId === user.user_id ? (
                      <input
                        type="text"
                        className="border px-2 py-1 text-sm rounded"
                        value={user.username}
                        onChange={(e) => {
                          const newUsername = e.target.value;
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.user_id === user.user_id
                                ? { ...u, username: newUsername }
                                : u
                            )
                          );
                        }}
                      />
                    ) : (
                      user.username || "N/A"
                    )}
                  </td>

                  <td className="p-3">
                    {editingUserId === user.user_id ? (
                      <input
                        type="text"
                        className="border px-2 py-1 text-sm rounded"
                        value={user.phone || ""}
                        onChange={(e) => {
                          const newPhone = e.target.value;
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.user_id === user.user_id
                                ? { ...u, phone: newPhone }
                                : u
                            )
                          );
                        }}
                      />
                    ) : (
                      user.phone || "-"
                    )}
                  </td>

                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={user.role_id}
                      onChange={(e) =>
                        handleRoleChange(user.user_id, Number(e.target.value))
                      }
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        editingUserId === user.user_id
                          ? handleUpdateUserInfo(user)
                          : setEditingUserId(user.user_id)
                      }
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      {editingUserId === user.user_id ? "Lưu" : "Sửa"}
                    </Button>

                    <Button
                      className="danger"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
