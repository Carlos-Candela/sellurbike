const { responseReturn } = require("../utiles/response"); // Utilidad para respuestas
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary
const userModel = require("../models/userModel");


class sellerController {
  // Obtener un vendedor buscado
  request_seller_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    let skipPage = "";
    skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
      } else {
        const sellers = await userModel
          .find({
            status: "pending",
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createAt: -1 });
        const totalSeller = await userModel
          .find({
            status: "pending",
          })
          .countDocuments();

        responseReturn(res, 200, {
          sellers,
          totalSeller,
        });
      }
    } catch (error) {
        responseReturn(res, 500, {
          error: error.message
        });
    }
  };
  // End method


  get_seller = async (req, res)=>{
    
    const {sellerId} = req.params
    
    try {
        const seller = await userModel.findById(sellerId)

        responseReturn(res, 200, {seller})
    } catch (error) {
        responseReturn(res, 500, {error: error.message})
    }
  }
//End Method

seller_status_update = async (req, res)=>{
  
  const {sellerId, status} = req.body
  
  try {
    await userModel.findByIdAndUpdate(sellerId, {status:status})
    const seller = await userModel.findById(sellerId)

    responseReturn(res, 200, {seller, message: 'Estado actualizado correctamente.'})
  } catch (error) {
    responseReturn(res, 500, {error: error.message})
  }
}


}

module.exports = new sellerController();
