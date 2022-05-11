const GOOGLE_CLIENT_ID = "987882199766-i0n7dhevjdfhv5dggffecdivqa16ms6q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const HOST = "http://localhost:3030";
const HOST_REDIRECT = `${HOST}/steps`;
const SCOPES = ["openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read"];

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;
const request = require("request");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const moment = require("moment");
const { isEmpty } = require("lodash");
const { google } = require("googleapis");

app.use(cors());
app.use(cookieParser());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST_REDIRECT);


app.get("/", (req, res) => {
    res.redirect("/oauth");
})

app.get("/oauth", (req, res) => {
    if(!isEmpty(oauth2Client.credentials)){
        res.redirect("/steps");
    }else {
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES, 
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userid
            })
        })
        res.redirect(url);
    }
});

app.get("/oauth2callback", (req, res) => {
    const code = req.query.code;
    oauth2Client.getToken(code, (err, token) => {
        oauth2Client.setCredentials(token);
        console.log("Token setado, redirecionamento para /steps");
        res.redirect("/steps")
    });
});

app.get("/steps", async (req, res) => {
    res.send("helhou")
})

app.listen(port, () => console.log(`Rodando na porta ${port}`));

function getAuthorization(params) {
    
}
