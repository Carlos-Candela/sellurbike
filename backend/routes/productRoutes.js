const express = require("express");
const productController = require("../controllers/productController");
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para las productos
router.post("/product-add", authMiddleware,productController.add_product); 
router.get("/products-get", authMiddleware, productController.products_get);
router.get("/product-get/:productId", authMiddleware, productController.product_get);
router.post("/product-update", authMiddleware, productController.product_update);
router.post("/product-image-update", authMiddleware, productController.product_image_update);
router.post("/product-image-delete", authMiddleware, productController.product_image_delete);
router.get("/get-all-products", authMiddleware, productController.get_all_products);




module.exports = router;