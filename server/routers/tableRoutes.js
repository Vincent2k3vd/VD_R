const express = require('express');
const router = express.Router();
const { 
    getAllTables, 
    getTableById, 
    getTablesByStatus, 
    createTable, 
    updateTable, 
    deleteTable,
    getStatus,
    findGuestCount
} = require('../controllers/tableController');

const validateTableFilters = require ('../middlewares/validateTableFilters.js')
const validateTableId = require ('../middlewares/validateTableId.js')


router.post('/search/by-guest', findGuestCount);

router.get('/', validateTableFilters, getAllTables);

/**
 * @route GET /tables/status/:status
 * @desc Get tables by specific status
 * @access Public
 * @param {string} status - Table status
 * @example GET /tables/status/available
 */
router.get('/status/:status', getTablesByStatus);

/**
 * @route GET /tables/:id
 * @desc Get table by ID
 * @access Public
 * @param {number} id - Table ID
 * @example GET /tables/1
 */
router.get('/:id', validateTableId, getTableById);

/**
 * @route POST /tables
 * @desc Create new table
 * @access Private (add auth middleware if needed)
 * @body {object} table - Table data
 * @example POST /tables
 */
router.post('/', createTable);

/**
 * @route PUT /tables/:id
 * @desc Update table by ID
 * @access Private (add auth middleware if needed)
 * @param {number} id - Table ID
 * @body {object} table - Updated table data
 * @example PUT /tables/1
 */
router.put('/:id', validateTableId, updateTable);

/**
 * @route DELETE /tables/:id
 * @desc Delete table by ID
 * @access Private (add auth middleware if needed)
 * @param {number} id - Table ID
 * @example DELETE /tables/1
 */
router.delete('/:id', validateTableId, deleteTable);

// Additional helpful routes

/**
 * @route GET /tables/filters/options
 * @desc Get all available filter options
 * @access Public
 */
router.get('/filters/options', (req, res) => {
    res.json({
        success: true,
        data: {
            status: ['available', 'occupied', 'reserved', 'maintenance'],
            type: ['standard', 'vip', 'private', 'outdoor'],
            sortBy: ['id', 'name', 'capacity', 'price', 'status', 'type', 'created_at', 'updated_at'],
            sortOrder: ['ASC', 'DESC']
        }
    });
});

/**
 * @route GET /tables/stats/summary
 * @desc Get table statistics summary
 * @access Public
 */
router.get('/stats/summary', getStatus);


module.exports = router;