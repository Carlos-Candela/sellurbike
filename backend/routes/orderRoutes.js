const express = require("express");
const orderController = require("../controllers/orderController");
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para las ordenes de compra
router.post("/checkout", authMiddleware,orderController.checkout)


module.exports = router;