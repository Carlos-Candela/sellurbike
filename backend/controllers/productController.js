const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary
const productModel = require("../models/productModel");

class productController {
  add_product = async (req, res) => {
  const { userId: id } = req;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return responseReturn(res, 400, {
        error: "Error al procesar el formulario.",
      });
    }

    let { name, category, description, price, state } = fields;
    let { images } = files;

    // Manejar el caso de una sola imagen o ninguna imagen
    const imageArray = images ? (Array.isArray(images) ? images : [images]) : [];

    name = name.trim();
    const slug = name.split(" ").join("-");

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key_cloud,
      api_secret: process.env.api_secret_cloud,
      secure: true,
    });

    try {
      let allImageUrl = [];

      // Subir imágenes a Cloudinary solo si hay imágenes
      if (imageArray.length > 0) {
        const uploadPromises = imageArray.map((image) =>
          cloudinary.uploader.upload(image.filepath, { folder: "products" })
        );
        const results = await Promise.all(uploadPromises);
        allImageUrl = results.map((result) => result.url);
      }

      // Crear el producto en la base de datos
      const product = await productModel.create({
        sellerId: id,
        name,
        slug,
        category: category.trim(),
        description: description.trim(),
        state,
        price: parseInt(price),
        images: allImageUrl,
      });

      responseReturn(res, 201,{ product, message: "Producto creado con éxito." });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  });
};
  //End method

  products_get = async (req, res)=>{
    const {page, searchValue, parPage} = req.query
    const {userId : id} = req
    let skipPage = '';
    skipPage = parseInt(parPage) * (parseInt(page)-1)

    try {
      if (searchValue) {
              const products = await productModel.find({
                $text: {$search: searchValue},
                sellerId: id
              }).skip(skipPage).limit(parPage).sort({createAt: -1})
              const totalProduct = await productModel.find({
                $text: {$search: searchValue},
                sellerId: id
              }).countDocuments()
              responseReturn(res, 200, {products, totalProduct,});
            }else{
              const products = await productModel
                .find({sellerId: id})
                .skip(skipPage)
                .limit(parPage)
                .sort({ createAt: -1 });
              const totalProduct = await productModel.find({sellerId: id}).countDocuments();
              responseReturn(res, 200, {products, totalProduct});
            } 
    } catch (error) {
              console.log(error.message)

    }
  }
//End method

product_get = async(req, res)=>{
    const {productId} = req.params
    
    try {
        const product = await productModel.findById(productId)
        responseReturn(res, 200, {product});
    } catch (error) {
        console.log(error.message)
    }
}
//End method

}

module.exports = new productController();
