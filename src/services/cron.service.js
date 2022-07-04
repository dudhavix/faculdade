const cron = require("node-cron");
const googlefitService = require("./googlefit.service");
const helperGoogle = require("./src/config/helper-google");

cron.schedule("*/2 * * * *", () => {
    helperGoogle.refreshToken(tokens).then(resposta => {
        googlefit.getStepsTimeEstipuleted(resposta.res.data.access_token, "2022-06-26", "2022-07-02").then(resposta => {
            const steps = googlefit.mapperStepsTimeEstipuleted(resposta);
            res.send({steps});
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })

    console.log("Executando a tarefa a cada 2 minuto");
});