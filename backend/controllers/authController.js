const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");

class authControllers {
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
}
module.exports = new authControllers();
