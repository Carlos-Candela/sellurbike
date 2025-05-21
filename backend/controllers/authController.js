const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const userCustomerModel = require("../models/chat/userCustomerModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");
const formidable = require("formidable"); // Middleware para manejar formularios
const cloudinary = require("cloudinary").v2; // Librería para manejar Cloudinary

class authControllers {
  //Metodo login del administrador
  //Recibe el correo y la contraseña del administrador y lo logea
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");

      if (!admin) {
        return responseReturn(res, 404, {
          error: "No es un administrador correcto",
        });
      }

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        return responseReturn(res, 401, {
          error: "La contraseña no es correcta",
        });
      } else {
        const token = await createToken({ id: admin._id, role: admin.role });
        res.cookie("accesToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return responseReturn(res, 200, { token, message: "Login correcto" });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.mesagge });
    }
  };
  //Fin del metodo login_admin

  //Metodo login del usuario
  //Recibe el correo y la contraseña del usuario y lo logea
  user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return responseReturn(res, 404, {
          error: "El email de usuario no es correcto.",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return responseReturn(res, 401, {
          error: "La contraseña no es correcta",
        });
      } else {
        const token = await createToken({ id: user._id, role: user.role });
        res.cookie("accesToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return responseReturn(res, 200, { token, message: "Login correcto" });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.mesagge });
    }
  };
  //Fin del metodo login_admin

  //Metodo para registrar un usuario
  //Recibe el nombre, el correo y la contraseña del usuario y lo registra
  user_register = async (req, res) => {
    console.log("Register user");
    console.log(req.body);
    const { name, surname, email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        return responseReturn(res, 404, { error: "El email ya existe." });
      } else {
        const user = await userModel.create({
          name,
          surname,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manual",
        });
        await userCustomerModel.create({
          myId: user._id,
        });
        const token = await createToken({ id: user._id, role: user.role });
        res.cookie("accesToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, {
          token,
          message: "Registro completado con exito.",
        });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Error interno del servidor" });
    }
  };
  //Fin del metodo user_register

  //Metodo para obtener el usuario logeado y si es admin o seller
  //Recibe el id y el rol del usuario logeado y lo devuelve
  getUser = async (req, res) => {
    const { userId, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(userId);
        
        responseReturn(res, 200, { userInfo: user });

      } else {
        const seller = await userModel.findById(userId);
        
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Error interno del servidor" });
    }
  };
  //Fin del metodo getUser

  profile_image_upload = async (req,res)=>{
    const {userId} = req
    const form = formidable();
    form.parse(req, async(err,_ , files)=>{
          cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key_cloud,
          api_secret: process.env.api_secret_cloud,
          secure: true,
        });

        const {image} = files

        try {
          const result = await cloudinary.uploader.upload(image.filepath, {folder: 'profile'})
          if (result) {
            await userModel.findByIdAndUpdate(userId,{
              image: result.url
            })
            const userInfo = await userModel.findById(userId)
            responseReturn(res, 201, {message: "Imagen de perfil actualizada con exito.",userInfo});
          } else {
            responseReturn(res, 404, { error: "Error al cargar la imagen." });
          }
        } catch (error) {
          responseReturn(res, 500, { error: "Error interno del servidor" });
        }
    })

  }
  //End Method

  profile_data_change = async (req, res)=>{
    const {userId}= req
    const form = formidable();
    form.parse(req,async(err,fields,_)=>{
      const{name,surname,address,province,postalCode,city,phone} = fields;
      
      try {
        if (err) {
          responseReturn(res, 404, {error: "Error al actualizar el perfil."});
        
        } else {
          await userModel.findByIdAndUpdate(userId,{
              name: name,
              surname: surname,
              address: address,
              province: province,
              postalCode: postalCode,
              city: city,
              phone: phone
            })
            const userInfo = await userModel.findById(userId)
            responseReturn(res, 201, {message: "Datos del perfil actualizados con exito.",userInfo});
        }
        

      } catch (error) {
        responseReturn(res, 500, { error: "Error interno del servidor" });
      }
    })
  }
  //End method

  logout = async (req, res) => {
  res.cookie("accesToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return responseReturn(res, 200, { message: "Logout exitoso" });
};
//End Method

}
module.exports = new authControllers();
