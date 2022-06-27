const express = require("express");

const desafioService = require("../services/desafio");
const { recuperarToken } = require("../config/middleware");

const desafio = express.Router();

desafio.route("/create").post(recuperarToken, async (req, res) => {
    const response = await desafioService.create(req.body);
    response ? res.status(200).send("comunidade criada com sucesso!") : res.status(400).send("erro ao criar a comunidade");
});

desafio.route("/findByIdComunidade/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await desafioService.findByIdComunidade(req.params.idComunidade);
    response ? res.status(200).send(response) : res.status(400).send("erro ao entrar na comunidade");
});

module.exports = desafio;