require("dotenv").config();
const helperGoogle = require("./src/config/helper-google");
const moment = require("moment");
const googlefit = require("./src/services/googlefit.service");

const express = require("express")
const app = express();

const data = new Date(moment().add(1, "day")).getTime();
const tokens = { refresh_token: '1//0hd8xC8iZaaO1CgYIARAAGBESNgF-L9IryuUdQPqaYlXQdH6l3NjWynEY1ULT9iz7_tKi8zX3WHrysqyvKBav10QV_3MVum3LCg' }


app.get('/hoje', async (req, res) => {
    helperGoogle.refreshToken(tokens).then(resposta => {
        googlefit.getStepsHoje(resposta.res.data.access_token).then(resposta => {
            const steps = googlefit.mapperDataHoje(resposta);
            res.send({steps});
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
});

app.get('/week', async (req, res) => {
    helperGoogle.refreshToken(tokens).then(resposta => {
        googlefit.getStepsWeek(resposta.res.data.access_token, 0, 6).then(resposta => {
            const steps = googlefit.mapperDataStepsWeek(resposta);
            res.send({steps});
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
});

app.get('/', async (req, res) => {
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
});



app.listen(5005, () => console.log(`Rodando na porta 5005`));


console.log(new Date(moment("2022-07-04").hour(00).minute(00).second(00)).getTime());
console.log(new Date(moment("2022-07-04").hour(23).minute(59).second(59)).getTime());
