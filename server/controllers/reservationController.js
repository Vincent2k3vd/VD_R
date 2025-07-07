const { Table, TableReservation, ReservationItem, MenuItem } = require("../models");
const { Op } = require("sequelize");

// const createReservation = async (req, res) => {}
// const getUserReservations = async (req, res) => {}
// const getReservationById = async (req, res) => {}
// const updateReservation = async (req, res) => {}
// const cancelReservation = async (req, res) => {}
// const confirmReservation = async (req, res) => {}

const showTable = async (req, res) => {
  try {
    const { status } = req.query;

    // Tạo điều kiện where tùy vào status có được truyền không
    const whereCondition = status ? { status } : {};

    const tables = await Table.findAll({
      where: whereCondition,
      attributes: ["id", "name", "type", "capacity", "status"]
    });

    const result = tables.map((t) => ({
      id: t.id,
      name: t.name,
      type: t.type,
      capacity: t.capacity,
      status: t.status
    }));

    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bàn:", error);
    res.status(500).json({ message: "Không thể lấy danh sách bàn" });
  }
};



const createReservation = async (req, res) => {
  try {
    const userId = req.userId;
    const { date, time, guests, special_requests, table_type, menu_items } = req.body;

    // Tìm bàn trống phù hợp theo loại và số chỗ
    const availableTable = await Table.findOne({
      where: {
        type: table_type,
        status: "available",
        capacity: { [Op.gte]: guests }
      },
      order: [["capacity", "ASC"]]
    });

    if (!availableTable) {
      return res.status(404).json({ message: "Không còn bàn trống phù hợp." });
    }

    // Tạo bản ghi đặt bàn
    const reservation = await TableReservation.create({
      user_id: userId,
      date,
      time,
      guests,
      special_requests,
      table_type_id: availableTable.id,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Thêm món nếu có
    if (menu_items && Array.isArray(menu_items)) {
      for (const item of menu_items) {
        await ReservationItem.create({
          reservation_id: reservation.reservation_id,
          menu_item_id: item.menu_item_id,
          quantity: item.quantity
        });
      }
    }

    // Cập nhật trạng thái bàn
    await availableTable.update({ status: "reserved" });

    res.status(201).json({
      message: "Đặt bàn thành công.",
      reservation_id: reservation.reservation_id
    });

  } catch (error) {
    console.error("Lỗi khi đặt bàn:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đặt bàn." });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const reservation = await TableReservation.findOne({
      where: {
        reservation_id: id,
        user_id: userId
      }
    });

    if (!reservation) {
      return res.status(404).json({ message: "Đặt bàn không tồn tại hoặc không thuộc quyền của bạn." });
    }

    await Table.update({ status: "available" }, { where: { id: reservation.table_type_id } });

    await ReservationItem.destroy({ where: { reservation_id: id } });
    await reservation.destroy();

    res.json({ message: "Huỷ đặt bàn thành công." });
  } catch (error) {
    console.error("Lỗi khi huỷ đặt bàn:", error);
    res.status(500).json({ message: "Không thể huỷ đặt bàn." });
  }
};


const getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await TableReservation.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Table,
          attributes: ["id", "name", "type"]
        },
        {
          model: ReservationItem,
          as: "items",
          include: {
            model: MenuItem,
            attributes: ["item_name", "price"]
          }
        }
      ],
      order: [["date", "DESC"], ["time", "DESC"]]
    });

    const result = reservations.map((r) => ({
      reservation_id: r.reservation_id,
      date: r.date,
      time: r.time,
      guests: r.guests,
      table: r.Table?.name || "Chưa xác định",
      table_type: r.Table?.type || null,
      menu_items: (r.items || []).map((ri) => ({
        name: ri.MenuItem.item_name,
        quantity: ri.quantity
      }))
    }));

    res.json(result);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đặt bàn:", error);
    res.status(500).json({ message: "Không thể lấy danh sách đặt bàn." });
  }
};



module.exports = {
    showTable,
    createReservation,
    cancelReservation,
    getMyReservations
};
