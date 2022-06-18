const express = require("express");

const comunidadeService = require("../services/comunidade");
const usuarioComundiadeService = require("../services/usuario-comunidade");
const { recuperarToken } = require("../config/middleware");

const comunidade = express.Router();

comunidade.route("/findByRandom").get(recuperarToken, async (req, res) => {
    const response = await comunidadeService.findByRandom(req.user.usuario._id);
    if (!response) {
        res.status(400).send("erro ao retornar as comunidades");
    }
    res.status(200).send(response);
});

comunidade.route("/create").post(recuperarToken, async (req, res) => {
    const response = await comunidadeService.create({
        ...req.body,
        admin: req.user.usuario._id
    });
    response ? res.status(200).send("comunidade criada com sucesso!") : res.status(400).send("erro ao criar a comunidade");
});

comunidade.route("/entrar/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await usuarioComundiadeService.create(req.user.usuario._id, req.params.idComunidade);
    comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, true);
    response ? res.status(200).send("você entrou na comunidade!") : res.status(400).send("erro ao entrar na comunidade");
});

comunidade.route("/sair/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await usuarioComundiadeService.delete(req.user.usuario._id, req.params.idComunidade);
    comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, false);
    response ? res.status(200).send("você saiu na comunidade!") : res.status(400).send("erro ao sair da comunidade");
});

comunidade.route("/update").put(recuperarToken, async (req, res) => {
    const response = await comunidadeService.update({
        ...req.body,
        admin: req.user.usuario._id
    }, req.user.usuario._id);
    response ? res.status(204).send("comunidade atualizada com sucesso!") : res.status(400).send("erro ao atualizar a comunidade");
});

comunidade.route("/delete/:idComunidade").delete(recuperarToken, async (req, res) => {
    const response = await comunidadeService.delete(req.params.idComunidade, req.user.usuario._id);
    response ? res.status(204).send("comunidade fechada com sucesso!") : res.status(400).send("erro ao fechar a comunidade");
});

comunidade.route("/findById/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await comunidadeService.findById(req.params.idComunidade);
    if (!response) {
        res.status(400).send("erro ao retornar a comunidade");
    }
    res.status(200).send(response);
});

module.exports = comunidade;