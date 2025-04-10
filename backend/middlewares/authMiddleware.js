const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async(req,res,next) => {
    const {accesToken} = req.cookies;
    if(!accesToken){
        return res.status(409).json({error: "Porfavor debes logearte primero"})
    }else{
        try {
            const decodeToken = await jwt.verify(accesToken, process.env.SECRET)
            req.role = decodeToken.role
            req.userId = decodeToken.id
            next()
        }catch(error){
            return res.status(409).json({error: "Logeate de nuevo"})
        }
    }
}