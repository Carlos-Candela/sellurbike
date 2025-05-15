const categoryModel = require("../models/categoryModel"); // Modelo de categorías
const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary

class CategoriesController {


  // Obtener categoria buscada
  get_category = async (req, res) => {

    const {page, searchValue, parPage} = req.query
    const skipPage = parseInt(parPage) * (parseInt(page)-1)
    
    try {
      if (searchValue && page && parPage) {
        const categories = await categoryModel.find({
          $text: {$search: searchValue}
        }).skip(skipPage).limit(parPage).sort({createAt: -1})
        const totalCategory = await categoryModel.find({
          $text: {$search: searchValue}
        }).countDocuments()
        responseReturn(res, 200, {
          categories,
          totalCategory,
        });
      } 
      else if (searchValue === "" && page && parPage){
        const categories = await categoryModel.find({
          
        }).skip(skipPage).limit(parPage).sort({createAt: -1})
        const totalCategory = await categoryModel.find({
          
        }).countDocuments()
        responseReturn(res, 200, {
          categories,
          totalCategory,
        });
      }
      
      else {
        const categories = await categoryModel.find({       }).sort({createAt: -1})
            const totalCategory = await categoryModel.find({        }).countDocuments()
        responseReturn(res, 200, {categories,totalCategory,});
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  // End method



  // Crear una nueva categoría
  createCategory = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "algo salio mal" });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim();
        const slug = name.split(" ").join("-").toLowerCase();

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key_cloud,
          api_secret: process.env.api_secret_cloud,
          secure: true,
        });
        
        try {
          // Verificar si ya existe una categoría con el mismo nombre o slug
          const existingCategory = await categoryModel.findOne({ name });
          if (existingCategory) {
            return responseReturn(res, 400, { error: "Ya existe una categoría con este nombre." });
          }

          // Continuar con la creación de la categoría si no existe
          const result = await cloudinary.uploader.upload(image.filepath, {folder: "categories"})
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url
            })
            responseReturn( res, 201, { category,
              message: "Categoría creada con éxito."})
          } else {
            responseReturn(res, 404, { error: "Fallo al subir la imagen." });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Fallo interno del servidor." });
        }
        
      }
    });
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

      return responseReturn(res, 200, {
        message: "Categoría actualizada con éxito",
        category: updatedCategory,
      });
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

      return responseReturn(res, 200, {
        message: "Categoría eliminada con éxito",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new CategoriesController();
