require("dotenv").config();

const http = require("http");
const express = require("express");
const app = express();
const serveHttp = http.createServer(app);
const fs = require("fs").promises;
const passport = require("passport");
const cors = require("cors");
const { Server } = require("socket.io");
const chat = require("./src/services/chat");

require("./src/config/auth");
const { generateAuthUrl } = require("./src/config/helper-google");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(passport.initialize());


// =============== ROTAS DE FUNÇÕES ===============
const comunidadeRouter = require("./src/controllers/comunidade");
app.use("/comunidade", comunidadeRouter);

const usuarioComunidadeRouter = require("./src/controllers/usuario-comunidade");
app.use("/usuario-comunidade", usuarioComunidadeRouter);

const googlefitRouter = require("./src/controllers/googlefit");
app.use("/googlefit", googlefitRouter);


// =============== ROTAS DE ACESSO ===============

app.get("/", async (req, res) => {
    res.send("oi");
});

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

// =============== ROTA PARA RECUPERAR HISTÓRICO CHAT ===============

app.get('/chat/:idComunidade', async (req, res) => {
    const mensagens = await chat.findAll(req.params.idComunidade);
    res.send(mensagens);
});


// CONFIGURAÇÕES DO CHAT

const io = new Server(serveHttp, {
    cors: {
        origin: process.env.HOST_FRONTEND,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("abrirChatComunidade", (idComunidade) => {
        if(idComunidade){
            socket.join(idComunidade)
        }
    });

    socket.on("message", async (data) => {
        const message = await chat.create({...data, created: new Date()});
        io.to(data.comunidade).emit("message:received", message);
    })
})

serveHttp.listen(process.env.PORT || 8080, () => console.log(`Rodando na porta ${process.env.PORT}`));