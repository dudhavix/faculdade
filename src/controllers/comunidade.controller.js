const express = require("express");

const comunidadeService = require("../services/comunidade.service");
const usuarioService = require("../services/usuario.service");
const { recuperarToken } = require("../config/middleware");

const comunidade = express.Router();

comunidade.route("/create").post(recuperarToken, async (req, res) => {
    const validEntrarComunidade = await usuarioService.validEntrarComunidade(req.user.token._id);
    
    if(validEntrarComunidade){
        res.status(400).send("usuário ja pertence a uma comunidade saia antes de criar outra");
    }else{
        const response = await comunidadeService.create({
            ...req.body,
            admin: req.user.token._id
        });
        response ? res.status(200).send("comunidade criada com sucesso!") : res.status(400).send("erro ao criar a comunidade");
    }
});

comunidade.route("/entrar/:idComunidade").get(recuperarToken, async (req, res) => {
    const validEntrarComunidade = await usuarioService.validEntrarComunidade(req.user.token._id);

    if(validEntrarComunidade){
        res.status(400).send("usuário não pode entrar em mais de uma comunidade");
    }else{
        const response = await usuarioService.entrarComunidade(req.user.token._id, req.params.idComunidade);
        comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, true);
        response ? res.status(200).send("você entrou na comunidade!") : res.status(400).send("erro ao entrar na comunidade");
    }
});

comunidade.route("/sair/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await usuarioService.sairComunidade(req.user.token._id);
    comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, false);
    response ? res.status(200).send("você saiu na comunidade!") : res.status(400).send("erro ao sair da comunidade");
});

comunidade.route("/delete/:idComunidade").delete(recuperarToken, async (req, res) => {
    const response = await comunidadeService.delete(req.params.idComunidade, req.user.token._id);
    response ? res.status(200).send("comunidade fechada com sucesso!") : res.status(400).send("erro ao fechar a comunidade");
});

comunidade.route("/update").put(recuperarToken, async (req, res) => {
    const response = await comunidadeService.update({
        ...req.body,
        admin: req.user.token._id
    }, req.user.token._id);
    response ? res.status(200).send("comunidade atualizada com sucesso!") : res.status(400).send("erro ao atualizar a comunidade");
});

comunidade.route("/findById/:idComunidade").get(recuperarToken, async (req, res) => {
    const response = await comunidadeService.findById(req.params.idComunidade);
    if (!response) {
        res.status(400).send("erro ao retornar a comunidade");
    }
    res.status(200).send(response);
});

comunidade.route("/findByRandom").get(recuperarToken, async (req, res) => {
    const response = await comunidadeService.findByRandom(req.user.token._id);
    if (!response) {
        res.status(400).send("erro ao retornar as comunidades");
    }else{
        res.status(200).send(response);
    }
});

module.exports = comunidade;