const { Table } = require('../models/index.js');
const { Op } = require("sequelize");
const buildWhereClause = require('../utils/buildWhereClauseTable');
const generateRecommendations = require('../utils/recommendTable.js');

const getAllTables = async (req, res) => {
  try {
    const {
      status,
      type,
      capacity,
      sortBy = 'capacity',
      sortOrder = 'ASC',
    } = req.query;

    const filters = {
      status,
      type,
      capacity,
    };

    const whereClause = buildWhereClause(filters);

    // Nếu bạn không cần count, có thể dùng findAll
    const tables = await Table.findAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
    );

    res.status(200).json({
      success: true,
      data: tables,
      filters: activeFilters,
      meta: {
        hasFilters: Object.keys(activeFilters).length > 0,
        sortBy,
        sortOrder: sortOrder.toUpperCase(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tables',
      error: error.message,
    });
  }
};

const findGuestCount = async (req, res) => {
  try {
    const { guestCount } = req.body;

    if (isNaN(guestCount) || guestCount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'guestCount phải là số nguyên dương'
      });
    }

    const availableTables = await Table.findAll({
      where: { status: 'available' },
      order: [['capacity', 'ASC']]
    });

    
    const singleTable = availableTables.find(table => table.capacity >= guestCount);

    if (singleTable) {
      return res.json({
        success: true,
        message: 'Có bàn đơn phù hợp',
        data: [singleTable],
        guestCount,
        combination: false
      });
    }

    // Bước 3: Nếu không có bàn đơn, tìm tổ hợp bàn
    const combinations = [];
    const tableCount = availableTables.length;

    const findCombos = (start, combo, total) => {
      if (total >= guestCount) {
        combinations.push([...combo]);
        return;
      }

      for (let i = start; i < tableCount; i++) {
        combo.push(availableTables[i]);
        findCombos(i + 1, combo, total + availableTables[i].capacity);
        combo.pop();
      }
    };

    findCombos(0, [], 0);

    if (combinations.length === 0) {
      return res.json({
        success: false,
        message: 'Không tìm được tổ hợp bàn phù hợp',
        data: [],
        guestCount
      });
    }

    // Bước 4: Chọn tổ hợp ít dư chỗ nhất
    const bestCombo = combinations.reduce((prev, current) => {
      const prevCap = prev.reduce((sum, t) => sum + t.capacity, 0);
      const currCap = current.reduce((sum, t) => sum + t.capacity, 0);
      return currCap < prevCap ? current : prev;
    });

    res.json({
      success: true,
      message: 'Không có bàn đơn, gợi ý tổ hợp bàn',
      data: bestCombo,
      guestCount,
      combination: true
    });

  } catch (error) {
    console.error('Lỗi khi tìm bàn:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm bàn phù hợp',
      error: error.message
    });
  }
};

const recommendTables = async (req, res) => {
  try {
    const { guest_count } = req.body;
    if (typeof guest_count !== "number" || guest_count <= 0) {
      return res.status(400).json({ message: "Số lượng khách không hợp lệ" });
    }

    const tablesRaw = await Table.findAll({
      where: { status: "available" },
    });

    const tablesData = tablesRaw.map((t) => t.toJSON());
    const result = generateRecommendations(tablesData, guest_count);

    return res.json(result);
  } catch (error) {
    console.error("Lỗi gợi ý bàn:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};



const getTableById = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findByPk(id);
        
        if (!table) {
            return res.status(404).json({
                success: false,
                message: `Table with ID ${id} not found`
            });
        }
        
        res.status(200).json({
            success: true,
            data: table
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching table',
            error: error.message
        });
    }
};

const createTable = async (req, res) => {
    try {
        const tableData = req.body;
        console.log(tableData);
        
        if (!tableData.table_number) {
            return res.status(400).json({
                success: false,
                message: 'Table number is required'
            });
        }
        
        const newTable = await Table.create(tableData);
        
        res.status(201).json({
            success: true,
            message: 'Table created successfully',
            data: newTable
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating table',
            error: error.message
        });
    }
};

const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const table = await Table.findByPk(id);
        
        if (!table) {
            return res.status(404).json({
                success: false,
                message: `Table with ID ${id} not found`
            });
        }
        
        const updatedTable = await table.update(updateData);
        
        res.status(200).json({
            success: true,
            message: 'Table updated successfully',
            data: updatedTable
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating table',
            error: error.message
        });
    }
};

const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        
        const table = await Table.findByPk(id);
        
        if (!table) {
            return res.status(404).json({
                success: false,
                message: `Table with ID ${id} not found`
            });
        }
        
        await table.destroy();
        
        res.status(200).json({
            success: true,
            message: 'Table deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting table',
            error: error.message
        });
    }
};

const getTablesByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        
        const validStatuses = ['available', 'unavailable', 'reserved'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
            });
        }
        
        const tables = await Table.findAll({
            where: { status: status.toLowerCase() }
        });
        
        res.status(200).json({
            success: true,
            data: tables,
            count: tables.length,
            status: status.toLowerCase()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tables by status',
            error: error.message
        });
    }
};

const getStatus = async (req, res) => {
    try {
      
        const stats = await Table.findAll({
            attributes: [
                'status',
                [require('sequelize').fn('COUNT', '*'), 'count']
            ],
            group: ['status']
        });
        
        const totalTables = await Table.count();
        
        res.json({
            success: true,
            data: {
                total: totalTables,
                byStatus: stats.reduce((acc, stat) => {
                    acc[stat.status] = parseInt(stat.get('count'));
                    return acc;
                }, {})
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching table statistics',
            error: error.message
        });
    }
};

const options = async (req, res) => {
    res.json({
        success: true,
        data: {
            status: ['available', 'occupied', 'reserved', 'maintenance'],
            type: ['standard', 'vip', 'private', 'outdoor'],
            sortBy: ['id', 'name', 'capacity', 'price', 'status', 'type', 'created_at', 'updated_at'],
            sortOrder: ['ASC', 'DESC']
        }
    });
};

const updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const table = await Table.findByPk(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: `Table with ID ${id} not found`,
      });
    }

    table.status = status;
    await table.save();

    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: table,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái bàn",
      error: err.message,
    });
  }
};



module.exports = {
    getAllTables,
    getTableById,
    getTablesByStatus,
    createTable,
    updateTable,
    deleteTable,
    getStatus,
    findGuestCount,
    recommendTables,
    options,
    updateTableStatus
};