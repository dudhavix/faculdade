const jsonwebtoken = require("jsonwebtoken");
const usuarioService = require("../services/usuario.service");

module.exports = {
    recuperarToken: async (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        
        if(!token){
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }
        
        const tokenDecode = jsonwebtoken.decode(token);

        const existe = usuarioService.validExisteId(tokenDecode.token._id);

        if(!existe){
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }

        req.user =  {...tokenDecode};
        next();
    }
};