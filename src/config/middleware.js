const jsonwebtoken = require("jsonwebtoken");
const usuarioService = require("../services/usuario.service");
const helperLog = require("./helper-log");

module.exports = {
    recuperarToken: async (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            helperLog.warning("middleware", "recuperar_token", "token vazio");
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }
        
        const tokenDecode = jsonwebtoken.decode(token);

        const existe = usuarioService.validExisteId(tokenDecode.token._id);

        if(!existe){
            helperLog.warning("middleware", "recuperar_token", "usuário não existe");
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }

        req.user =  {...tokenDecode};
        next();
    }
};