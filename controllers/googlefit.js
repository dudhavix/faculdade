const express = require("express");

const googleFitService = require("../services/googleFit");
const { recuperarToken } = require("../config/middleware");

const googleFit = express.Router();

googleFit.route("/steps").get(recuperarToken, async (req, res) => {
    const stepsData = await googleFitService.getSteps(req.user.accessToken);
    if(!stepsData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os passos");  
    }else{
        const steps = googleFitService.mapperData(stepsData);
        res.send(steps);
    }
});

googleFit.route("/sleep").get(recuperarToken, async (req, res) => {
    const sleepData = await googleFitService.getSleep(req.user.accessToken);
    if(!sleepData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os dados de sono");  
    }else{
        const sleep = googleFitService.mapperData(sleepData);
        res.send(sleep);
    }
});

googleFit.route("/heartRate").get(recuperarToken, async (req, res) => {
    const heartRateData = await googleFitService.getHeartRate(req.user.accessToken);
    if(!heartRateData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os dados de frequência cardíaca");  
    }else{
        const heartRate = googleFitService.mapperData(heartRateData);
    res.send(heartRate);
    }
});

module.exports = googleFit;