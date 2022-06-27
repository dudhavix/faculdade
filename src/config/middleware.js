const jsonwebtoken = require("jsonwebtoken");
const usuarioService = require("../services/usuario");
const helperLog = require("./helper-log");

module.exports = {
    recuperarToken: (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        
        if(!token){
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }
        
        const tokenDecode = jsonwebtoken.decode(token);
        const usuarioExiste = usuarioService.validExisteId(tokenDecode.usuario._id);

        if(!usuarioExiste){
            res.redirect(`${process.env.HOST_FRONTEND}/login`);
        }
        req.user = tokenDecode;
        next();
    }
};