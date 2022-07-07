const cron = require("node-cron");
const moment = require("moment");
const helperLog = require("../config/helper-log");
const googlefitService = require("./googlefit.service");
const helperGoogle = require("../config/helper-google");

const desafioService = require("../services/desafio.service");
const usuarioService = require("../services/usuario.service");
const auditoriaModels = require('../models/auditoria.models');

cron.schedule("*/10 * * * *", () => {
    helperLog.debug("cron", "atualizar passos", "inicio do cron");
    atualizarPassos()
});

cron.schedule("59 58 23 * * *", () => {
    helperLog.debug("cron", "finished_Ate_O_Fim", "inicio do cron");
    finishedAteOFim();
});

cron.schedule("0 0 */1 * * *", () => {
    helperLog.debug("cron", "finished_Ate_O_limite", "inicio do cron");
    finishedAteOLimite();
});

async function finishedAteOFim() {
    const dayHoje = moment().format("YYYY-MM-DD");
    const desafios = await desafioService.findAllFinishedAteOFim(dayHoje);
    for (const desafio of desafios) {
        await desafioService.finalizar(desafio)
    }
}

async function finishedAteOLimite() {
    const desafios = await desafioService.findAllFinishedAteOLimite();
    for (const desafio of desafios) {
        await desafioService.finalizar(desafio)
    }
}

async function atualizarPassos() {
    const desafios = await desafioService.findAll();
    if(desafios.length == 0 ){
        return
    }
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