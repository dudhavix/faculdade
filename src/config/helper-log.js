module.exports = {
    warning: (local, funcao, msg) => {
        console.log("\x1b[35m%s\x1b[0m", `${new Date().toLocaleString()}  ===>  [ WARNING ]  ===> [ ${local.toUpperCase()} ]  ===> [ ${funcao.toUpperCase()} ]  ===> ${msg}`);
    },
    error: (local, funcao, msg) => {
        console.log("\x1b[31m%s\x1b[0m", `${new Date().toLocaleString()}  ===>  [ ERROR ]  ===> [ ${local.toUpperCase()} ]  ===> [ ${funcao.toUpperCase()} ]  ===> ${msg}`);
    },
    success: (local, funcao, msg) => {
        console.log("\x1b[32m%s\x1b[0m", `${new Date().toLocaleString()}  ===>  [ SUCCESS ]  ===> [ ${local.toUpperCase()} ]  ===> [ ${funcao.toUpperCase()} ]  ===> ${msg}`);
    },
    debug: (local, funcao, msg) => {
        console.log("\x1b[34m%s\x1b[0m", `${new Date().toLocaleString()}  ===>  [ DEBUG ]  ===> [ ${local.toUpperCase()} ]  ===> [ ${funcao.toUpperCase()} ]  ===> ${msg}`);
    },
}