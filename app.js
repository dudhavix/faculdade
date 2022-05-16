require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./config/auth");

const app = express();

app.use(cors());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.redirect("/");
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/oauth">Authenticate with Google</a>');
});

app.get('/oauth', passport.authenticate('google', { scope: process.env.SCOPES }));

app.get("/oauth2callback", passport.authenticate('google', { successRedirect: '/protected', failureRedirect: '/oauth/failure' }));

app.get("/protected", isLoggedIn, (req, res) => {
    res.send(req.user);
});

app.get("/oauth/failure", (req, res) => {
    res.send("Falha ao logar");
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(204);
});

app.listen(process.env.PORT, () => console.log(`Rodando na porta ${process.env.PORT}`));
