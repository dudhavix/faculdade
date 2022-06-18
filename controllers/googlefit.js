const express = require("express");

const googlefitService = require("../services/googlefit");
const { recuperarToken } = require("../config/middleware");

const googlefit = express.Router();

googlefit.route("/steps").get(recuperarToken, async (req, res) => {
    const stepsData = await googlefitService.getSteps(req.user.accessToken);
    if(!stepsData){
        res.status(400).send("desculpe ocorreu um erro ao recuperar os passos");  
    }else{
        const steps = googlefitService.mapperData(stepsData);
        res.send(steps);
    }
});

googlefit.route("/sleep").get(recuperarToken, async (req, res) => {
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