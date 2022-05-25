require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { getSteps, getSleep, getHeartRate, mapperData } = require("./services");
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
    res.redirect("/login");
});

app.get('/oauth', passport.authenticate('google', { scope: process.env.SCOPES }));

app.get("/oauth2callback", passport.authenticate('google', { successRedirect: '/login', failureRedirect: '/oauth/failure' }));

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get("/login", isLoggedIn, (req, res) => {
    res.redirect("/home");
});

app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("adeus");
});

app.get("/home", isLoggedIn, (req, res) => {
    res.send("<a href='/steps'> Steps </a> --- <a href='/sleep'> Sleep </a> --- <a href='/heartRate'> Ritmo cardiáco </a>")
});

app.get("/steps", isLoggedIn, async (req, res) => {
    const stepsData = await getSteps(req.user.accessToken);
    const steps = mapperData(stepsData);
    res.send(steps);
});

app.get("/sleep", isLoggedIn, async (req, res) => {
    const sleepData = await getSleep(req.user.accessToken);
    const sleep = mapperData(sleepData);
    res.send(sleep);
});

app.get("/heartRate", isLoggedIn, async (req, res) => {
    const heartRateData = await getHeartRate(req.user.accessToken);
    const heartRate = mapperData(heartRateData);
    res.send(heartRate);
});

app.listen(process.env.PORT, () => console.log(`Rodando na porta ${process.env.PORT}`));

