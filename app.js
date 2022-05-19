require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { default: axios } = require("axios");
const moment = require("moment");
const { cookie } = require("request");
require("./config/auth");

const app = express();

app.use(cors());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect("/oauth");
}

app.use(session({ secret: 'cats', name: 'sessionId', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/oauth">Authenticate with Google</a>');
});

app.get('/oauth', passport.authenticate('google', { scope: process.env.SCOPES }));

app.get("/oauth2callback", passport.authenticate('google', { successRedirect: '/login', failureRedirect: '/oauth/failure' }));

app.get("/login", isLoggedIn, (req, res) => {
    //res.send(req.user);
    res.redirect("/testes");
});

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("adeus");
});

app.get("/testes", isLoggedIn, (req, res) => {
    axios
        .post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": 1652670000000,
            "endTimeMillis": 1652756399000
        }, { headers: getAuthorization(req.user.accessToken) })
        .then(({ data }) => {
            res.send(data);
        })
        .catch(err => {
            res.send(err.response.data)
        });
})

app.listen(process.env.PORT, () => console.log(`Rodando na porta ${process.env.PORT}`));

function getAuthorization(accessToken) {
    return { authorization: `Bearer ${accessToken}` }
}

function getAggregateBy(dataTypeName, dataSourceId, start = null, end = null, durationMillis = 86400000, format = "DDMMYYYY") {
    return {
        aggregateBy: [{ dataTypeName, dataSourceId }],
        bucketByTime: { durationMillis }, // 86400000 is 24 hours
        startTimeMillis: start ? moment(start, format).valueOf() : moment().valueOf(),
        endTimeMillis: end ? moment(end, format).valueOf() : moment().valueOf()
    };
}