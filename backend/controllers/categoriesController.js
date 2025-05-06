const Category = require("../models/categoryModel"); // Modelo de categorías
const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas

class CategoriesController {

    // Obtener todas las categorías
    getAllCategories = async (req, res) => {
        console.log("Solicitud recibida para obtener todas las categorías");
      try {
        const categories = await Category.find(); // Obtiene todas las categorías
        return responseReturn(res, 200, { categories });
        
      } catch (error) {
        return responseReturn(res, 500, { error: error.message });
      }
    };
  
    // Crear una nueva categoría
    createCategory = async (req, res) => {
      const { name } = req.body;
      try {
        // Verifica si la categoría ya existe
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
          return responseReturn(res, 400, { error: "La categoría ya existe" });
        }
  
        const newCategory = new Category({ name });
        await newCategory.save();
        return responseReturn(res, 201, { message: "Categoría creada con éxito", category: newCategory });
      } catch (error) {
        return responseReturn(res, 500, { error: error.message });
      }
    };
  
    // Actualizar una categoría
    updateCategory = async (req, res) => {
      const { id } = req.params;
      const { name } = req.body;
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          { name },
          { new: true } // Devuelve el documento actualizado
        );
  
        if (!updatedCategory) {
          return responseReturn(res, 404, { error: "Categoría no encontrada" });
        }
  
        return responseReturn(res, 200, { message: "Categoría actualizada con éxito", category: updatedCategory });
      } catch (error) {
        return responseReturn(res, 500, { error: error.message });
      }
    };
  
    // Eliminar una categoría
    deleteCategory = async (req, res) => {
      const { id } = req.params;
      try {
        const deletedCategory = await Category.findByIdAndDelete(id);
  
        if (!deletedCategory) {
          return responseReturn(res, 404, { error: "Categoría no encontrada" });
        }
  
        return responseReturn(res, 200, { message: "Categoría eliminada con éxito" });
      } catch (error) {
        return responseReturn(res, 500, { error: error.message });
      }
    };
  }
  
  module.exports = new CategoriesController();