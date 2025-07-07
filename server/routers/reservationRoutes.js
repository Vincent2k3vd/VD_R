const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/table', reservationController.showTable);

// Đặt bàn 
router.post('/booking', reservationController.createReservation);
router.post('/cancel', reservationController.cancelReservation);
router.get('/', verifyToken, reservationController.getMyReservations);

module.exports = router;