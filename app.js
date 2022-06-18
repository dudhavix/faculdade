require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs").promises;
const app = express();

require("./config/auth");
const { generateAuthUrl } = require("./config/helper-google");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(passport.initialize());


// =============== ROTAS DE FUNÇÕES ===============
const comunidadeRouter = require("./controllers/comunidade");
app.use("/comunidade", comunidadeRouter);

const usuarioComunidadeRouter = require("./controllers/usuario-comunidade");
app.use("/usuario-comunidade", usuarioComunidadeRouter);

const googlefitRouter = require("./controllers/googlefit");
app.use("/googleFit", googlefitRouter);


// =============== ROTAS DE ACESSO ===============

app.get("/login", async (req, res) => {
    const url = await generateAuthUrl();
    res.send(url);
});

app.get("/oauth2callback", passport.authenticate('google', { failureRedirect: `${process.env.HOST_FRONTEND}/erro`, session: false }), (req, res) => {
    let token = res.req.user;
    res.redirect(`${process.env.HOST_FRONTEND}/login?token=${token}`);
});

app.get("/logout", async (req, res) => {
    res.status(204).send();
});


// =============== ROTA DE CARREGGAR ARQUIVOS ===============
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