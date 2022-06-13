require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs").promises;
const { getSteps, getSleep, getHeartRate, mapperData } = require("./services/googleFit");
const comunidadeService = require("./services/comunidade");
const usuarioService = require("./services/usuario");
const usuarioComundiadeService = require("./services/usuario-comunidade");
require("./config/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("public"));

function isLoggedIn(req, res, next) {
    // req.user = {usuario: {
    //     "_id": "62a4d863db83438c745150bc",
    //     "name": "Duda Santos",
    //     "picture": "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c"
    // }}
    // next();

    // req.user = {usuario: {
    //     "_id": "62a5640bb34d031d72da525a",
    //     "name": "eduarda santos",
    //     "picture": "https://lh3.googleusercontent.com/a-/AOh14Giog5gGf-FwR1W5phAxzHGBlRLlQPfqxY_Dp9Xo4g=s96-c"
    // }}
    // next();

    req.user = {usuario: {
        "_id": "62a5fb97077abf1b25dba9ac",
        "name": "Taiga Aisaka",
        "picture": "https://th.bing.com/th/id/OIP.cTfc8VzeHusOu1pRb8bznwHaHa?pid=ImgDet&rs=1"
    }}
    next();

    
    // if(req.user && req.user.usuario){
    //     const validExisteId = usuarioService.validExisteId(req.user.usuario._id);
    //     if(validExisteId && req.user.accessToken){
    //         next();
    //     }else{
    //         res.redirect("/oauth");
    //     }
    // }else{
    //     res.redirect("/oauth");
    // }
}

app.use(session({ secret: process.env.PASSAPORT_SECRET, name: process.env.PASSAPORT_NAME, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth', passport.authenticate('google', { scope: process.env.SCOPES }));

app.get("/oauth2callback", passport.authenticate('google', { successRedirect: '/login', failureRedirect: '/oauth/failure' }));

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get("/login", isLoggedIn, (req, res) => {
    res.send({ ...req.user.usuario });
});

app.get("/logout", (req,
    res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});



// COMUNIDADE
app.post("/comunidade/create", isLoggedIn, async (req, res) => {
    try {
        const response = await comunidadeService.create({
            ...req.body,
            admin: req.user.usuario._id
        });
        response ? res.status(200).send("comunidade criada com sucesso!") : res.status(400).send("erro ao criar a comunidade");    
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO CRIAR A COMUNIDADE ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

app.get("/comunidade/entrar/:idComunidade", isLoggedIn, async (req, res) => {
    try {
        const response = await usuarioComundiadeService.create(req.user.usuario._id, req.params.idComunidade);
        comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, true);
        response ? res.status(200).send("você entrou na comunidade!") : res.status(400).send("erro ao entrar na comunidade");    
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO ENTRAR NA COMUNIDADE ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

app.get("/comunidade/sair/:idComunidade", isLoggedIn, async (req, res) => {
    try {
        const response = await usuarioComundiadeService.delete(req.user.usuario._id, req.params.idComunidade);
        comunidadeService.atualizarTotalParticipantes(req.params.idComunidade, false);
        response ? res.status(200).send("você saiu na comunidade!") : res.status(400).send("erro ao sair da comunidade");    
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO ENTRAR NA COMUNIDADE ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

app.put("/comunidade/update", isLoggedIn, async (req, res) => {
    try {
        const response = await comunidadeService.update({
            ...req.body,
            admin: req.user.usuario._id
        }, req.user.usuario._id);
        response ? res.status(204).send("comunidade atualizada com sucesso!") : res.status(400).send("erro ao atualizar a comunidade");    
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO ATUALIZAR A COMUNIDADE ====> ', erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

app.delete("/comunidade/delete/:idComunidade", isLoggedIn, async (req, res) => {
    try {
        const response = await comunidadeService.delete(req.params.idComunidade, req.user.usuario._id);
        response ? res.status(204).send("comunidade fechada com sucesso!") : res.status(400).send("erro ao fechar a comunidade");    
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO FECHAR A COMUNIDADE ====> ', erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

//retorna todas as comunidades desse usuário (que esta autenticado)
app.get('/usuario-comunidade/findByAllUsuario', isLoggedIn, async (req, res) => {
    try {
        const response = await usuarioComundiadeService.findAllUsuario(req.user.usuario._id);
        if(!response){
            res.status(400).send("erro ao retornar as comunidades");
        }
        res.status(200).send(response);
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO RETORNAR AS COMUNIDADES ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

//retorna todos usuários dessa comunidade
app.get('/usuario-comunidade/findByAllComunidade/:idComunidade', isLoggedIn, async (req, res) => {
    try {
        const response = await usuarioComundiadeService.findAllComunidade(req.params.idComunidade);
        if(!response){
            res.status(400).send("erro ao retornar as comunidades");
        }
        res.status(200).send(response);
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO RETORNAR AS COMUNIDADES ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

//retorna 3 comunidades aleatórias
app.get('/comunidade/findByAllRandom', isLoggedIn, async (req, res) => {
    try {
        const response = await comunidadeService.findAllRandom(req.user.usuario._id);
        if(!response){
            res.status(400).send("erro ao retornar as comunidades");
        }
        res.status(200).send(response);
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO RETORNAR AS COMUNIDADES ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});

app.get('/comunidade/findById/:idComunidade', isLoggedIn, async (req, res) => {
    try {
        const response = await comunidadeService.findById(req.params.idComunidade);
        if(!response){
            res.status(400).send("erro ao retornar a comunidade");
        }
        res.status(200).send(response);
    } catch (erro) {
        console.log('ERRO NO CONTROLLER AO RETORNAR AS COMUNIDADES ====> ',  erro)
        res.status(500).send("desculpe ocorreu um erro no servidor");
    }
});



// app.get("/home", isLoggedIn, (req, res) => {
//     res.send("<a href='/steps'> Steps </a> --- <a href='/sleep'> Sleep </a> --- <a href='/heartRate'> Ritmo cardiáco </a> --- <a href='/logout'> Sair </a>")
// });

// app.get("/steps", isLoggedIn, async (req, res) => {
//     const stepsData = await getSteps(req.user.accessToken);
//     const steps = mapperData(stepsData);
//     res.send(steps);
// });

// app.get("/sleep", isLoggedIn, async (req, res) => {
//     const sleepData = await getSleep(req.user.accessToken);
//     const sleep = mapperData(sleepData);
//     res.send(sleep);
// });

// app.get("/heartRate", isLoggedIn, async (req, res) => {
//     const heartRateData = await getHeartRate(req.user.accessToken);
//     const heartRate = mapperData(heartRateData);
//     res.send(heartRate);
// });



// app.get('/read-comunidades/:id', async (req, res) => {
//     await getComunidade(req.params.id, res)
// });

// app.get('/read-my-comunidades/:idUsuario', async (req, res) => {
//     await getMyComunidades(req.params.idUsuario, res)
// });

// app.get('/read-my-comunidades-admin/:admin', async (req, res) => {
//     await getMyComunidadesAdmin(req.params.admin, res)
// });

// app.post("/update-comunidade", async (req, res) => {
//     await updateComunidade(req.body, res);
// });

// app.delete('/delete-comunidade/:admin/:_id', async (req, res) => {
//     await deleteComunidade(req.params._id, req.params.admin, res)
// });

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

