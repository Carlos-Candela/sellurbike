const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para las categorías
router.get("/categories",  categoriesController.getAllCategories); // Obtener todas las categorías
router.post("/category-add", authMiddleware, categoriesController.createCategory); // Crear una nueva categoría
router.put("/:id", categoriesController.updateCategory); // Actualizar una categoría
router.delete("/:id", categoriesController.deleteCategory); // Eliminar una categoría

module.exports = router;