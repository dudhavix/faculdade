const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static(path.resolve(__dirname, "./dist")));

const porta = process.env.PORT || 5000;

app.listen(porta);

console.log(`servindo na porta ${porta}`);