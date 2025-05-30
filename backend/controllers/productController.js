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
      const imageArray = images
        ? Array.isArray(images)
          ? images
          : [images]
        : [];

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

        responseReturn(res, 201, {
          product,
          message: "Producto creado con éxito.",
        });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  //End method

  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { userId: id } = req;
    let skipPage = "";
    skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
             name: { $regex: searchValue, $options: "i" },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createAt: -1 });
        const totalProduct = await productModel
          .find({
             name: { $regex: searchValue, $options: "i" },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //End method

  product_get = async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  //End method

  //FALTARIA IMPLEMENTAR EL AÑADIR NUEVAS IMAGENES
  product_update = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return responseReturn(res, 400, { error: "Error al procesar el formulario." });
    }

    let {
      title: name,
      category,
      description,
      price,
      state,
      productId
    } = fields;

    name = name.trim();
    const slug = name.split(" ").join("-");

    // Manejar imágenes nuevas si se suben
    let { images: newImages } = files;
    let newImageUrls = [];

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key_cloud,
      api_secret: process.env.api_secret_cloud,
      secure: true,
    });

    try {
      // Subir nuevas imágenes si existen
      if (newImages) {
        const imageArray = Array.isArray(newImages) ? newImages : [newImages];
        const uploadPromises = imageArray.map((image) =>
          cloudinary.uploader.upload(image.filepath, { folder: "products" })
        );
        const results = await Promise.all(uploadPromises);
        newImageUrls = results.map((result) => result.url);
      }

      // Obtener el producto actual
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, { error: "Producto no encontrado." });
      }

      // Combinar imágenes antiguas y nuevas, rellenando huecos (null) primero
      let updatedImages = product.images || [];
      if (newImageUrls.length > 0) {
        let imgIndex = 0;
        // Rellenar huecos null con nuevas imágenes
        updatedImages = updatedImages.map(img => {
          if (img === null && imgIndex < newImageUrls.length) {
            return newImageUrls[imgIndex++];
          }
          return img;
        });
        // Si sobran imágenes nuevas, añádelas al final
        while (imgIndex < newImageUrls.length) {
          updatedImages.push(newImageUrls[imgIndex++]);
        }
      }

      await productModel.findByIdAndUpdate(productId, {
        name,
        category,
        description,
        price,
        state,
        slug,
        images: updatedImages,
      });

      const updatedProduct = await productModel.findById(productId);
      responseReturn(res, 201, {
        product: updatedProduct,
        message: "Producto actualizado con éxito.",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  });
};
//End method

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (error, fields, files) => {
      const { oldImage } = fields;
      const {productId} = fields
      const { newImage } = files;
      
      if (error) {
        responseReturn(res, 400, { error: error.message });
      } else {
        try {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key_cloud,
        api_secret: process.env.api_secret_cloud,
        secure: true,
      });
      const result = await cloudinary.uploader.upload(newImage.filepath, {
        folder: "products",
      });

      if (!result) {
        return responseReturn(res, 404, { error: "Fallo al actualizar imagenes" });
      }

      // Buscar el producto y comprobar existencia
      const product = await productModel.findById(productId);
      if (!product) {
        return responseReturn(res, 404, { error: "Producto no encontrado." });
      }
      if (!product.images || !Array.isArray(product.images)) {
        return responseReturn(res, 404, { error: "El producto no tiene imágenes." });
      }

      const index = product.images.findIndex((img) => img === oldImage);
      if (index === -1) {
        return responseReturn(res, 404, { error: "Imagen anterior no encontrada en el producto." });
      }

      product.images[index] = result.url;
      await productModel.findByIdAndUpdate(productId, { images: product.images });

      const updatedProduct = await productModel.findById(productId);
      responseReturn(res, 200, {
        product: updatedProduct,
        message: "Imagenes actualizadas con éxito.",
  });
} catch (error) {
  responseReturn(res, 404, { error: error.message });
}
      }
    });
  };
  //End method

  product_image_delete = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (error, fields, files) => {
      const {imageUrl, productId} = fields
      
      if (error) {
        responseReturn(res, 400, { error: error.message });
      } else {
        try {
        
  // Buscar el producto y comprobar existencia
  const product = await productModel.findById(productId);
  if (!product) {
    return responseReturn(res, 404, { error: "Producto no encontrado." });
  }
  if (!product.images || !Array.isArray(product.images)) {
    return responseReturn(res, 404, { error: "El producto no tiene imágenes." });
  }

  const index = product.images.findIndex((img) => img === imageUrl);
  if (index === -1) {
    return responseReturn(res, 404, { error: "Imagen anterior no encontrada en el producto." });
  }

  product.images[index] = null;
  
  await productModel.findByIdAndUpdate(productId, { images: product.images });

  const updatedProduct = await productModel.findById(productId);
  responseReturn(res, 200, {
    product: updatedProduct,
    message: "Imagenes actualizadas con éxito.",
  });
} catch (error) {
  responseReturn(res, 404, { error: error.message });
}
      }
    });
  };
  //End method

  get_all_products = async (req, res) => {
  try {
    const products = await productModel.find({});
    responseReturn(res, 200, { products , message: "Lista productos actualizada"});
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};
//End Method

// Eliminar un producto
product_delete = async (req, res) => {
  const {id}= req.params
 
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return responseReturn(res, 404, { error: "Producto no encontrado" });
    }

    return responseReturn(res, 200, {
      message: "Producto eliminado con éxito",
      id: deletedProduct._id, // Devuelve el id eliminado
    });
  } catch (error) {
    return responseReturn(res, 500, { error: error.message });
  }
    
};
//End Method

}

module.exports = new productController();
