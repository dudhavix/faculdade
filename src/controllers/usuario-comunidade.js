const express = require("express");

const usuarioComundiadeService = require("../services/usuario-comunidade");
const { recuperarToken } = require("../config/middleware");

const usuarioComundiade = express.Router();

usuarioComundiade.route("/findByAllUsuario").get(recuperarToken, async (req, res) => {
    const response = await usuarioComundiadeService.findAllUsuario(req.user.usuario._id);
    if(!response){
        res.status(400).send("erro ao retornar as comunidades");
    }
    res.status(200).send(response);
});

usuarioComundiade.route("/findByAllComunidade/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await usuarioComundiadeService.findAllComunidade(req.params.idComunidade);
    if(!response){
        res.status(400).send("erro ao retornar as comunidades");
    }
    res.status(200).send(response);
});

module.exports = usuarioComundiade;