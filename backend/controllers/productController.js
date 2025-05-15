const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary
const productModel = require("../models/productModel")

class productController {
    
    add_product = async (req, res) => {
        
        const { userId: id } = req;
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
        
            let {name,category,description,price,state} = fields
            const {images} = files
            name = name.trim()
            const slug = name.split(' ').join('-')
            
            cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key_cloud,
            api_secret: process.env.api_secret_cloud,
            secure: true,
            });

            try {
                
                let allImageUrl = [];
                for (let index = 0; index < images.length; index++) {
                    const result = await cloudinary.uploader.upload(images[index].filepath, {folder: 'products'});
                    allImageUrl = [...allImageUrl, result.url]
                }
                
                
                
                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    category:category.trim(),
                    description: description.trim(),
                    state,
                    price: parseInt(price),
                    images: allImageUrl,
                    
                })
                responseReturn( res, 201, { message: "Producto creado con éxito."})
            } catch (error) {
                responseReturn( res, 500, { error: error.message})
            }

        });
    };
    //End method
}

module.exports = new productController();