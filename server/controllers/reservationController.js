const { Reservation, ReservationTable, ReservationItem, User, Table, MenuItem } = require('../models');
const { Op, where } = require('sequelize');

  const createReservation = async (req, res) => {
    try {
      const {
        user_id,
        table_id = [],
        reservation_date,
        reservation_time,
        guest_count,
        special_requests,
        items = []
      } = req.body;

      if (table_id.length === 0) {
        return res.status(400).json({ success: false, message: 'Cần chọn ít nhất một bàn' });
      }

      // Tìm các reservation trùng thời gian kèm theo bảng đã được đặt
      const conflictReservations = await Reservation.findAll({
        where: {
          reservation_date,
          reservation_time
        },
        include: [
          {
            model: Table,
            as: 'tables',
            where: {
              table_id: table_id
            },
            through: { attributes: [] }, // bảng trung gian
            attributes: ['table_id']
          }
        ]
      });

      if (conflictReservations.length > 0) {
        // Lấy danh sách table_id bị xung đột từ các reservation đã tồn tại
        const conflictTableIds = conflictReservations
          .flatMap(r => r.tables.map(t => t.table_id));

        return res.status(400).json({
          success: false,
          message: 'Một hoặc nhiều bàn đã được đặt trong thời gian này',
          conflict_table_id: conflictTableIds
        });
      }

      // Tính tổng tiền món ăn
      let total_amount = 0;
      for (const item of items) {
        const menuItem = await MenuItem.findByPk(item.menu_item_id);
        if (menuItem) {
          total_amount += menuItem.price * item.quantity;
        }
      }

      // Tạo đặt bàn
      const reservation = await Reservation.create({
        user_id,
        reservation_date,
        reservation_time,
        guest_count,
        special_requests,
        status: 'pending',
        total_amount,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Gán các bàn vào bảng trung gian
      await ReservationTable.bulkCreate(
        table_id.map(table_id => ({
          reservation_id: reservation.reservation_id,
          table_id
        }))
      );

      // Gán các món ăn nếu có
      if (items.length > 0) {
        const reservationItems = items.map(item => ({
          reservation_id: reservation.reservation_id,
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.unit_price * item.quantity,
          special_instructions: item.special_instructions || null
        }));

        await ReservationItem.bulkCreate(reservationItems);
      }

      // Trả lại thông tin đầy đủ
      const fullReservation = await Reservation.findByPk(reservation.reservation_id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['user_id', 'username', 'email', 'phone']
          },
          {
            model: Table,
            as: 'tables',
            attributes: ['table_id', 'table_number', 'capacity']
          },
          {
            model: ReservationItem,
            as: 'items',
            include: [
              {
                model: MenuItem,
                as: 'menuItem',
                attributes: ['menu_item_id', 'item_name', 'price']
              }
            ]
          }
        ]
      });

      for (const id of table_id) {
        const table = await Table.findOne({ where: { table_id: id } });
        if (table) {
          table.status = "reserved";
          await table.save();
        }
      }


      res.status(201).json({
        success: true,
        message: 'Đặt bàn thành công',
        data: fullReservation
      });

    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo đặt bàn',
        error: error.message
      });
    }
  };


  // Lấy danh sách reservations
  const  getReservations = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, user_id, date } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (status) where.status = status;
      if (user_id) where.user_id = user_id;
      if (date) where.reservation_date = date;

      const reservations = await ReservationTable.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: User,
            attributes: ['user_id', 'username', 'email', 'phone']
          },
          {
            model: Table,
            attributes: ['table_id', 'table_number', 'capacity']
          },
          {
            model: ReservationItem,
            as: 'MenuItem',
            include: [
              {
                model: MenuItem,
                attributes: ['menu_item_id', 'item_name', 'price']
              }
            ]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        data: reservations.rows,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(reservations.count / limit),
          total_items: reservations.count,
          items_per_page: parseInt(limit)
        }
      });

    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách đặt bàn',
        error: error.message
      });
    }
  }

  // Lấy chi tiết reservation
const getReservationById = async (req, res) => {
    try {
      const { id } = req.params;

      const reservation = await ReservationTable.findByPk(id, {
         include: [{
          model: Reservation,
          as: "reservation", 
          where: {
            reservation_date,
            reservation_time,
            status: { [Op.in]: ['pending', 'confirmed'] }
          }
        }]
      });

      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt bàn'
        });
      }

      res.json({
        success: true,
        data: reservation
      });

    } catch (error) {
      console.error('Error fetching reservation:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin đặt bàn',
        error: error.message
      });
    }
  }

  // Cập nhật reservation
  const updateReservation = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        table_id,
        reservation_date,
        reservation_time,
        guest_count,
        status,
        special_requests,
        items = []
        
      } = req.body;

      const reservation = await ReservationTable.findByPk(id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt bàn'
        });
      }

      // Kiểm tra bàn có sẵn không (nếu thay đổi bàn hoặc thời gian)
      if (table_id && (table_id !== reservation.table_id || 
          reservation_date !== reservation.reservation_date ||
          reservation_time !== reservation.reservation_time)) {
        const existingReservation = await ReservationTable.findOne({
          where: {
            table_id,
            reservation_date: reservation_date || reservation.reservation_date,
            reservation_time: reservation_time || reservation.reservation_time,
            status: {
              [Op.in]: ['pending', 'confirmed']
            },
            reservation_id: {
              [Op.ne]: id
            }
          }
        });

        if (existingReservation) {
          return res.status(400).json({
            success: false,
            message: 'Bàn đã được đặt trong thời gian này'
          });
        }
      }

      // Tính lại tổng tiền nếu có items
      let total_amount = reservation.total_amount;
      if (items.length > 0) {
        total_amount = 0;
        for (const item of items) {
          const menuItem = await MenuItem.findByPk(item.menu_item_id);
          if (menuItem) {
            total_amount += menuItem.price * item.quantity;
          }
        }
      }

      // Cập nhật reservation
      await reservation.update({
        table_id: table_id || reservation.table_id,
        reservation_date: reservation_date || reservation.reservation_date,
        reservation_time: reservation_time || reservation.reservation_time,
        guest_count: guest_count || reservation.guest_count,
        status: status || reservation.status,
        special_requests: special_requests || reservation.special_requests,
        total_amount,
        updated_at: new Date()
      });

      // Cập nhật items nếu có
      if (items.length > 0) {
        // Xóa items cũ
        await ReservationItem.destroy({
          where: { reservation_id: id }
        });

        // Tạo items mới
        const reservationItems = items.map(item => ({
          reservation_id: id,
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.unit_price * item.quantity,
          special_instructions: item.special_instructions || null
        }));

        await ReservationItem.bulkCreate(reservationItems);
      }

      // Lấy reservation với thông tin đầy đủ
      const updatedReservation = await ReservationTable.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['user_id', 'username', 'email', 'phone']
          },
          {
            model: Table,
            attributes: ['table_id', 'table_number', 'capacity']
          },
          {
            model: ReservationItem,
            as: 'MenuItem',
            include: [
              {
                model: MenuItem,
                attributes: ['menu_item_id', 'item_name', 'price']
              }
            ]
          }
        ]
      });

      res.json({
        success: true,
        message: 'Cập nhật đặt bàn thành công',
        data: updatedReservation
      });

    } catch (error) {
      console.error('Error updating reservation:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật đặt bàn',
        error: error.message
      });
    }
  }

  // Xóa reservation
  const  deleteReservation = async (req, res) => {
    try {
      const { id } = req.params;

      const reservation = await ReservationTable.findByPk(id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt bàn'
        });
      }

      // Xóa reservation items trước
      await ReservationItem.destroy({
        where: { reservation_id: id }
      });

      // Xóa reservation
      await reservation.destroy();

      // Trả lại trạng thái bàn
      const relatedTables = await ReservationTable.findAll({ where: { reservation_id: id } });
      for (const t of relatedTables) {
        const table = await Table.findByPk(t.table_id);
        if (table) {
          table.status = "available";
          await table.save();
        }
      }

      // Xóa bảng trung gian
      await ReservationTable.destroy({ where: { reservation_id: id } });

      res.json({
        success: true,
        message: 'Xóa đặt bàn thành công'
      });

    } catch (error) {
      console.error('Error deleting reservation:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi xóa đặt bàn',
        error: error.message
      });
    }
  }

  // Cập nhật trạng thái reservation
  const  updateReservationStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Trạng thái không hợp lệ'
        });
      }

      const reservation = await ReservationTable.findByPk(id);
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đặt bàn'
        });
      }

      await reservation.update({
        status,
        updated_at: new Date()
      });

      res.json({
        success: true,
        message: 'Cập nhật trạng thái thành công',
        data: { status }
      });

    } catch (error) {
      console.error('Error updating reservation status:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật trạng thái',
        error: error.message
      });
    }
  }

  // Lấy reservations của user
  const getUserReservations = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { page = 1, limit = 10, status } = req.query;
      const offset = (page - 1) * limit;

      const where = { user_id };
      if (status) where.status = status;

      const reservations = await ReservationTable.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: Table,
            as: 'tables',
            attributes: ['table_id', 'table_number', 'capacity']
          },
          {
            model: ReservationItem,
            as: 'items',
            include: [
              {
                model: MenuItem,
                as: 'menuItem',
                attributes: ['menu_item_id', 'item_name', 'price']
              }
            ]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        data: reservations.rows,
        pagination: {
          current_page: parseInt(page),
          total_pages: Math.ceil(reservations.count / limit),
          total_items: reservations.count,
          items_per_page: parseInt(limit)
        }
      });

    } catch (error) {
      console.error('Error fetching user reservations:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách đặt bàn của user',
        error: error.message
      });
    }
  }

  // Kiểm tra bàn có sẵn không
  const checkTableAvailability = async (req, res) => {
    try {
      const { table_id, reservation_date, reservation_time } = req.query;

      // Validate query params
      if (!table_id || !reservation_date || !reservation_time) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin bắt buộc: table_id, reservation_date, reservation_time'
        });
      }

      const existingReservation = await ReservationTable.findOne({
        where: {
          table_id,
          reservation_date,
          reservation_time,
          status: {
            [Op.in]: ['pending', 'confirmed']
          }
        }
      });

      const isAvailable = !existingReservation;

      res.json({
        success: true,
        data: {
          is_available: isAvailable,
          message: isAvailable ? 'Bàn có sẵn' : 'Bàn đã được đặt'
        }
      });

    } catch (error) {
      console.error('Error checking table availability:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi kiểm tra bàn',
        error: error.message
      });
    }
  };


module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  updateReservationStatus,
  getUserReservations,
  checkTableAvailability
}