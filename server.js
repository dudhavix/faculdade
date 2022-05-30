const express = require("express");
const path = require("path");
const serverStatic = require("serve-static");

const app = express();

app.use(serverStatic(path.join(__dirname, "dist")));

const porta = process.env.PORT || 5000;

app.listen(porta);

console.log(`servindo na porta ${porta}`);