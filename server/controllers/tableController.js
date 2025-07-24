const { Table } = require('../models/index.js');
const { Op } = require("sequelize");
const buildWhereClause = require('../utils/buildWhereClauseTable')

const getAllTables = async (req, res) => {
    try {
        const { 
            status, 
            type,
            capacity,
            
            // Sorting
            sortBy = 'capacity',
            sortOrder = 'ASC'
        } = req.query;
        
        const filters = {
            status: req.query.status,
            type: req.query.type,
            capacity: req.query.capacity,
        };

        // Build where clause
        const whereClause = buildWhereClause(filters);
        
        
        const { rows: tables } = await Table.findAndCountAll({
            where: whereClause,
            order: [[sortBy, sortOrder.toUpperCase()]]
        });
        
        // Clean up filters for response (remove undefined values)
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => 
                value !== undefined && value !== null && value !== ''
            )
        );
        
        res.status(200).json({
            success: true,
            data: tables,
            filters: activeFilters,
            meta: {
                hasFilters: Object.keys(activeFilters).length > 0,
                sortBy,
                sortOrder: sortOrder.toUpperCase()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tables',
            error: error.message
        });
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
        
        // Basic validation
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
        
        // Validate status values if needed
        const validStatuses = ['available', 'occupied', 'reserved', 'maintenance'];
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
        const { Table } = require('../models/index.js');
        
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

const findGuestCount = async (req, res) => {
  try {
    const {guestCount} = req.body;

    if (isNaN(guestCount) || guestCount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'guestCount phải là số nguyên dương'
      });
    }

    const tables = await Table.findAll({
      where: {
        status: 'available', 
        capacity: {
          [Op.gte]: guestCount // sức chứa >= số khách
        }
      },
      order: [['capacity', 'ASC']] // Ưu tiên bàn vừa đủ
    });

    res.json({
      success: true,
      data: tables,
      count: tables.length,
      guestCount
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


module.exports = {
    getAllTables,
    getTableById,
    getTablesByStatus,
    createTable,
    updateTable,
    deleteTable,
    getStatus,
    findGuestCount,
};