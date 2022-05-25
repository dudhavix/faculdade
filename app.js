require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const axios = require("axios");
const moment = require("moment");
const { cookie } = require("request");
const { getSteps, mapperSteps, getSleep } = require("./services");
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
    res.redirect("/steps");
});

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("adeus");
});

app.get("/steps", isLoggedIn, async (req, res) => {
    const stepsData = await getSteps(req.user.accessToken);
    const steps = await mapperSteps(stepsData);
    res.send(steps);
});

app.get("/sleep", isLoggedIn, async (req, res) => {
    const sleepData = await getSleep(req.user.accessToken);
    console.log(sleepData.data);
    res.send(sleepData.data);
});

app.listen(process.env.PORT, () => console.log(`Rodando na porta ${process.env.PORT}`));

