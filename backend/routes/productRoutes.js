const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para las productos
router.post("/product-add", authMiddleware,productController.add_product); 


module.exports = router;