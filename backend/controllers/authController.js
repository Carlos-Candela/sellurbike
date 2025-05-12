const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel")
const userCustomerModel = require("../models/chat/userCustomerModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");

class authControllers {

  //Metodo login del administrador
  //Recibe el correo y la contraseña del administrador y lo logea
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      
      if (!admin) {
        return responseReturn(res, 404, { error: "No es un administrador correcto" });
      }

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
       return responseReturn(res, 401, { error: "La contraseña no es correcta" });
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


  //Metodo para registrar un usuario
  //Recibe el nombre, el correo y la contraseña del usuario y lo registra
    user_register = async (req,res) =>{
      console.log("Register user")
      console.log(req.body)
      const {name,surname,email,password} = req.body
      try{

        const user = await userModel.findOne({email})
        if(user){
          return responseReturn(res, 404, { error: "El email ya existe." });
        }else{
          const user = await userModel.create({
            name,
            surname,
            email,
            password: await bcrypt.hash(password, 10),
            method: "manual"
          })
          await userCustomerModel.create({
            myId: user._id
          })
          const token = await createToken({id: user._id, role: user.role})
          res.cookie("accesToken", token,{expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)});
          responseReturn(res, 201,{token, message: "Registro completado con exito."} )
        }
      }catch(error){
          responseReturn(res, 500, {error: "Error interno del servidor"})
      }
    }
    //Fin del metodo user_register



  //Metodo para obtener el usuario logeado y si es admin o seller
  //Recibe el id y el rol del usuario logeado y lo devuelve
  getUser = async (req, res) => {
    const {id,role} = req;
    try {
      if(role === "admin"){
        const user = await adminModel.findById(id)
        responseReturn(res,200,{userInfo: user})
      }else{
        console.log('Seller info')
      }
    }
    catch(error){
      console.log(error.message)
    }
  };
  //Fin del metodo getUser
}
module.exports = new authControllers();
