const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Middlewares
const validateTableFilters = require('../middlewares/validateTableFilters.js');
const validateTableId = require('../middlewares/validateTableId.js');
const verifyToken = require('../middlewares/verifyToken.js');
const verifyRole = require('../middlewares/verifyRole.js');

// Gợi ý bàn nâng cao
router.post("/recommend", tableController.recommendTables);

// Tìm bàn theo số khách
router.post('/search/by-guest', tableController.findGuestCount);

// Lấy tất cả bàn, có filter
router.get('/', validateTableFilters, tableController.getAllTables);

// Lọc theo trạng thái
router.get('/status/:status', tableController.getTablesByStatus);

// Lấy table theo ID
router.get('/:id', validateTableId, tableController.getTableById);

// Tạo bàn
router.post('/', verifyToken, verifyRole([2, 1]), tableController.createTable);

// Cập nhật toàn bộ bàn
router.put('/:id', verifyToken, verifyRole([2, 1]), validateTableId, tableController.updateTable);

// Cập nhật chỉ trạng thái
/**
 * @route PATCH /tables/:id/status
 * @desc Update table status only (available/reserved/unavailable)
 * @access Private (Employee/Admin)
 */
router.patch('/:id/status', verifyToken, verifyRole([2, 1]), validateTableId, tableController.updateTableStatus);

// Xoá bàn
router.delete('/:id', verifyToken, verifyRole([2, 1]), validateTableId, tableController.deleteTable);

// Lấy filter options (status, loại, vị trí...)
router.get('/filters/options', tableController.options);

// Thống kê bàn
router.get('/stats/summary', tableController.getStatus);

module.exports = router;
