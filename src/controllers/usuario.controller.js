const express = require("express");

const { recuperarToken } = require("../config/middleware");

const usuarioService = require("../services/usuario.service");

const usuario = express.Router();

usuario.route("/").get(recuperarToken, async (req, res) => {
    const response = await usuarioService.findByUser(req.user.token._id);
    if(!response){
        res.status(400).send("erro ao retornar as comunidades");
    }
    res.status(200).send(response);
});


module.exports = usuario;