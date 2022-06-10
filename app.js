require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs").promises;
const { getSteps, getSleep, getHeartRate, mapperData } = require("./services");
const { createComunidade, getComunidades, getComunidade, updateComunidade, getMyComunidadesAdmin, deleteComunidade, getMyComunidades } = require("./services/comunidade");
require("./config/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("public"));
// app.set("view engine", "vue");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect("/oauth");
}

app.use(session({ secret: 'cats', name: 'sessionId', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth', passport.authenticate('google', { scope: process.env.SCOPES }));

app.get("/oauth2callback", passport.authenticate('google', { successRedirect: '/login', failureRedirect: '/oauth/failure' }));

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get("/login", isLoggedIn, (req, res) => {
    res.send({ user: req.user });
});

app.get("/logout", (req,
    res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});

app.get("/home", isLoggedIn, (req, res) => {
    res.send("<a href='/steps'> Steps </a> --- <a href='/sleep'> Sleep </a> --- <a href='/heartRate'> Ritmo cardiáco </a> --- <a href='/logout'> Sair </a>")
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

// COMUNIDADE

app.post("/create-comunidade", async (req, res) => {
    await createComunidade(req.body, res);
});

app.get('/read-comunidades', isLoggedIn, async (req, res) => {
    await getComunidades(req.user.usuario._id, res)
});

app.get('/read-comunidades/:id', async (req, res) => {
    await getComunidade(req.params.id, res)
});

app.get('/read-my-comunidades/:idUsuario', async (req, res) => {
    await getMyComunidades(req.params.idUsuario, res)
});

app.get('/read-my-comunidades-admin/:admin', async (req, res) => {
    await getMyComunidadesAdmin(req.params.admin, res)
});

app.post("/update-comunidade", async (req, res) => {
    await updateComunidade(req.body, res);
});

app.delete('/delete-comunidade/:admin/:_id', async (req, res) => {
    await deleteComunidade(req.params._id, req.params.admin, res)
});

// ARQUIVOS
app.get('/carregar-img-comunidades', async (req, res) => {
    const diretorio = "./public/img-comunidades";
    const arquivos = [];

    let listaDeArquivos = await fs.readdir(diretorio);
    for (let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if (stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push('img-comunidades/' + listaDeArquivos[k]);
    }

    res.send(arquivos);
});

app.listen(process.env.PORT, () => console.log(`Rodando na porta ${process.env.PORT}`));

