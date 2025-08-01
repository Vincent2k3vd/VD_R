import React, { useEffect, useState } from "react";
import {
  fetchFilteredMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateMenuItemAvailability,
} from "../../services/menuItemService";
import { Pencil, Trash2, Eye, EyeOff, Plus } from "lucide-react";

const AdminMenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    item_name: "",
    price: "",
    description: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchFilteredMenuItems({ limit: 100 });
      setMenuItems(res.data.data); // từ res.data.data
    } catch (err) {
      console.error("Lỗi khi lấy danh sách món:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.menu_item_id, form);
      } else {
        await createMenuItem(form);
      }
      setForm({ item_name: "", price: "", description: "" });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Lỗi khi lưu món ăn:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      item_name: item.item_name,
      price: item.price,
      description: item.description,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xoá món này không?")) {
      try {
        await deleteMenuItem(id);
        fetchData();
      } catch (err) {
        console.error("Lỗi khi xoá:", err);
      }
    }
  };

  const toggleAvailability = async (id, isAvailable) => {
    try {
      await updateMenuItemAvailability(id, !isAvailable);
      fetchData();
    } catch (err) {
      console.error("Lỗi khi đổi trạng thái:", err);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Quản lý thực đơn</h2>

      {/* Form thêm/sửa */}
      <div className="bg-white p-4 shadow rounded space-y-2">
        <h3 className="font-semibold">
          {editingItem ? "Sửa món" : "Thêm món mới"}
        </h3>
        <input
          name="item_name"
          placeholder="Tên món"
          value={form.item_name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="price"
          placeholder="Giá"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingItem ? "Cập nhật" : "Thêm mới"}{" "}
          <Plus className="inline ml-1" size={16} />
        </button>
      </div>

      {/* Danh sách món */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          menuItems.map((item) => (
            <div
              key={item.menu_item_id}
              className="border rounded p-4 shadow-sm"
            >
              <h4 className="font-bold text-lg">{item.item_name}</h4>
              <p>Giá: {Number(item.price).toLocaleString()}₫</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.menu_item_id)}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() =>
                    toggleAvailability(item.menu_item_id, item.is_available)
                  }
                  className="text-gray-600 hover:underline"
                >
                  {item.is_available ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMenuManager;
