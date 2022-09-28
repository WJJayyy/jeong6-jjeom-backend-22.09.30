const express = require('express');
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.get('/information', loginRequired, orderController.getOrderInfo)
router.get('/complete', loginRequired, orderController.getCompleteInfo)
router.delete('/choice', loginRequired, orderController.deleteCart)

module.exports = router;