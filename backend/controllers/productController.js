const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary
const productModel = require("../models/productModel")

class productController {
    
    add_product = async (req, res) => {
        
        const { userId: id } = req;
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
    if (err) {
        return responseReturn(res, 400, { error: "Error al procesar el formulario." });
    }

    let { name, category, description, price, state } = fields;
    let { images } = files;

    // Manejar el caso de una sola imagen
    const imageArray = Array.isArray(images) ? images : [images];

    name = name.trim();
    const slug = name.split(' ').join('-');

    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key_cloud,
        api_secret: process.env.api_secret_cloud,
        secure: true,
    });

    try {
        // Subir imágenes a Cloudinary
        const uploadPromises = imageArray.map(image =>
            cloudinary.uploader.upload(image.filepath, { folder: 'products' })
        );
        const results = await Promise.all(uploadPromises);
        const allImageUrl = results.map(result => result.url);

        // Crear el producto en la base de datos
        await productModel.create({
            sellerId: id,
            name,
            slug,
            category: category.trim(),
            description: description.trim(),
            state,
            price: parseInt(price),
            images: allImageUrl,
        });

        responseReturn(res, 201, { message: "Producto creado con éxito." });
    } catch (error) {
        responseReturn(res, 500, { error: error.message });
    }
});
    };
    //End method
}

module.exports = new productController();