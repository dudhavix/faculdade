const GOOGLE_CLIENT_ID = "987882199766-i0n7dhevjdfhv5dggffecdivqa16ms6q.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const express = require("express");
const app = express();
const port = 3030;
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParse = require("body-parser");
const axios = require("axios");
const { google } = require("googleapis");

app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "http://localhost:3030/steps");
    const scopes = ["openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read"];
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid
        })
    });
    request(url, (err, response, body) => {
        console.log("error: ", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({ url })
    })
});

app.get("/steps", async (req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "http://localhost:3030/steps");
    const tokens = await oauth2Client.getToken(code);

    try {
        const fonteDeDados = await listarFonteDeDados(tokens);
        fonteDeDados.data.dataSource.forEach(async element => {
            const fonteDeDadosID = await listarFonteDeDadosID(tokens, element.dataStreamId);
            const listaDataPointChanges = await dataPointChanges(tokens, fonteDeDadosID);
            console.log(listaDataPointChanges.data);
        });
        // {
        //     dataStreamId: 'derived:com.google.active_minutes:com.google.android.fit:samsung:SM-M625F:99d67212:top_level',
        //     dataStreamName: 'top_level',
        //     type: 'derived',
        //     dataType: { name: 'com.google.active_minutes', field: [ [Object] ] },
        //     device: {
        //       uid: '99d67212',
        //       type: 'phone',
        //       version: '',
        //       model: 'SM-M625F',
        //       manufacturer: 'samsung'
        //     },
        //     application: { packageName: 'com.google.android.fit' },
        //     dataQualityStandard: []
        // }
        
        // const fonteDeDadosID = await listarFonteDeDadosID(tokens, fonteDeDados.data.dataSource[1].dataStreamId);
        // console.log(fonteDeDadosID.data);

        // const listaDataPointChanges = await dataPointChanges(tokens, fonteDeDadosID);
        // console.log(listaDataPointChanges.data);
    } catch (error) {
        console.log(error);
    }

    res.send("helhou");
})

app.listen(port, () => console.log(`Ouvindo na porta ${port}`));

async function listarFonteDeDados(tokens) {
    try {
        const result = axios({
            method: "GET",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataSources`,
            headers: {
                authorization: `Bearer ${tokens.tokens.access_token}`
            },
            "Content-Type": "application/json"
        })
        return result;
    } catch (error) {
        console.log("LISTAR FONTE DE DADOS ======> ", error);
    }
}

async function listarFonteDeDadosID(tokens, dataSourceId) {
    try {
        const result = axios({
            method: "GET",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataSources/${dataSourceId}`,
            headers: {
                authorization: `Bearer ${tokens.tokens.access_token}`
            },
            "Content-Type": "application/json"
        })
        return result;
    } catch (error) {
        console.log("LISTAR FONTE DE DADOS ID ======> ", error);
    }
}

async function dataPointChanges(tokens, dataSourceId) {
    try {
        const result = axios({
            method: "GET",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataSources/${dataSourceId}/dataPointChanges`,
            headers: {
                authorization: `Bearer ${tokens.tokens.access_token}`
            },
            "Content-Type": "application/json"
        })
        return result;
    } catch (error) {
        console.log("LISTAR dataPointChanges ======> ", error);
    }
}