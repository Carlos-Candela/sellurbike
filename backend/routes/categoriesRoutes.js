const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

// Rutas para las categorías
router.get("/", categoriesController.getAllCategories); // Obtener todas las categorías
router.post("/", categoriesController.createCategory); // Crear una nueva categoría
router.put("/:id", categoriesController.updateCategory); // Actualizar una categoría
router.delete("/:id", categoriesController.deleteCategory); // Eliminar una categoría

module.exports = router;