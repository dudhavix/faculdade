const cron = require("node-cron");
const helperLog = require("../config/helper-log");
const googlefitService = require("./googlefit.service");
const helperGoogle = require("../config/helper-google");

const desafioService = require("../services/desafio.service");
const usuarioService = require("../services/usuario.service");
const auditoriaModels = require('../models/auditoria.models');

cron.schedule("*/10 * * * *", () => {
    helperLog.debug("cron", "inicio do cron", "");
    atualizarPassos()
});

async function atualizarPassos() {
    const desafios = await desafioService.findAll();
    let participantesDesafio = []
    for (const desafio of desafios) {
        const participantes = await usuarioService.findByComunidade(desafio.comunidade);
        participantesDesafio.push({ desafio, participantes });
    }
    for (const elemente of participantesDesafio) {
        for (const participante of elemente.participantes) {
            const { credenciais } = await auditoriaModels.findOne({ usuario: participante._id });
            helperGoogle.refreshToken(credenciais).then(novasCredenciais => {
                googlefitService.getStepsTimeEstipuleted(novasCredenciais.res.data.access_token, elemente.desafio.inicio, elemente.desafio.fim).then(async novasCredenciais => {
                    const steps = googlefitService.mapperStepsTimeEstipuleted(novasCredenciais);
                    await desafioService.atualizarPassos(elemente.desafio._id, participante._id, steps);
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            })
        }
    }
}