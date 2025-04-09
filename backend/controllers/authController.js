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
        return responseReturn(res, 404, { error: "Admin not found" });
      }

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
       return responseReturn(res, 401, { error: "Password not match" });
      } else {
        const token = await createToken({ id: admin._id, role: admin.role });
        res.cookie("accesToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        return responseReturn(res, 200, { token, message: "Login successfully" });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.mesagge });
    }
  };
}
module.exports = new authControllers();
