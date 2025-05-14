const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas para las categorías
router.get("/category-get", authMiddleware,categoriesController.get_category); // Obtener categoría buscada
router.post("/category-add", authMiddleware, categoriesController.createCategory); // Crear una nueva categoría
router.put("/:id", categoriesController.updateCategory); // Actualizar una categoría
router.delete("/:id", categoriesController.deleteCategory); // Eliminar una categoría

module.exports = router;