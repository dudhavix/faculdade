const express = require("express");

const googlefitService = require("../services/googlefit");
const { recuperarToken } = require("../config/middleware");
const helperGoogle = require("../config/helper-google");
const moment = require("moment");

const helperLog = require("../config/helper-log");

const googlefit = express.Router();

googlefit.route("/steps").get(recuperarToken, async (req, res) => {
    googlefitService.getSteps(req.user.credenciais.accessToken).then(resposta => {
        const steps = googlefitService.mapperDataSteps(resposta);
        res.send({steps})
    }).catch(erro => {
        helperLog.error("googlefit_controller", "steps", erro)
        res.status(400).send("desculpe ocorreu um erro ao recuperar os passos");
    })
});

googlefit.route("/steps-week").get(recuperarToken, async (req, res) => {
    googlefitService.getStepsWeek(req.user.credenciais.accessToken).then(resposta => {
        const steps = googlefitService.mapperDataSteps(resposta);
        res.send({steps})
    }).catch(erro => {
        helperLog.error("googlefit_controller", "steps-week", erro)
        res.status(400).send("desculpe ocorreu um erro ao recuperar os passos");
    })
});

googlefit.route("/testes").get(recuperarToken, async (req, res) => {
    //console.log(moment().day(0));
    console.log(moment().day(-7).hour(0).minute(0).millisecond(0));
    console.log(moment().day(-1).hour(23).minute(59).millisecond(59));
    console.log(new Date(moment().day(6)).getTime());
    res.send("oi")
});

googlefit.route("/sleep").get(recuperarToken, async (req, res) => {
    googlefitService.getSleep(req.user.credenciais.accessToken).then(resposta => {
        const steps = googlefitService.mapperData(resposta);
        res.send(steps)
    }).catch(() => {
        res.status(400).send("desculpe ocorreu um erro ao recuperar os passos");
    })

    const sleepData = await googlefitService.getSleep(req.user.accessToken);
    if(!sleepData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os dados de sono");  
    }else{
        const sleep = googlefitService.mapperData(sleepData);
        res.send(sleep);
    }
});

googlefit.route("/heartRate").get(recuperarToken, async (req, res) => {
    const heartRateData = await googlefitService.getHeartRate(req.user.accessToken);
    if(!heartRateData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os dados de frequência cardíaca");  
    }else{
        const heartRate = googlefitService.mapperData(heartRateData);
    res.send(heartRate);
    }
});

module.exports = googlefit;