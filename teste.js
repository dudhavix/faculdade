require("dotenv").config();
const { default: axios } = require('axios');
const jwt = require("jsonwebtoken");
const moment = require("moment");
const helperGoogle = require("./src/config/helper-google");
const googlefitService = require("./src/services/googlefit.service");
const googlefit = require("./src/services/googlefit.service");

const dataInicio = moment().unix();
const dataFim = moment().add(1, "hour").unix();

const generateToken = {
    sub: "109648348890999991353",
    email: "dudu.amelhor@gmail.com",
    scope: process.env.SCOPES,
    client_id: process.env.GOOGLE_CLIENT_ID,
}

// const token = jwt.sign(generateToken, process.env.PRIVATE_KEY, { algorithm: 'RS256', header: {"alg":"RS256","typ":"JWT"} });
const token = jwt.sign(generateToken, process.env.PRIVATE_KEY);

// console.log({ dataInicio });
// console.log({ dataFim });
console.log({ token });

helperGoogle.getToken(token).then(res => {
    console.log(res.data.access_token);
    // googlefit.getSteps(res.data.access_token, "109648348890999991353").then(resposta => {
    //     const steps = googlefitService.mapperDataSteps(resposta);
    //     console.log(steps);
    // })

}).catch(error => {
    console.log(error);
});

// helperGoogle.generateAccessToken(token).then(res => {
//     console.log(res.data.access_token);
//     // googlefit.getSteps(res.data.access_token, "109648348890999991353").then(resposta => {
//     //     const steps = googlefitService.mapperDataSteps(resposta);
//     //     console.log(steps);
//     // })

// }).catch(error => {
//     console.log(error);
// });

// const accessToken1 = "ya29.c.b0AXv0zTO1OGRM1LSZadMEzxy415-QEd1-2ctIZTsP9YmaNEEqWhNjby-bwueEgAEN9FFt6-ier3btAHLQ_6TKSoZdABmA_GXSbxdXWhYW32AJQcGRiFYyd-ANF-H7k_UJtrTRRntRqfrZGRxiGYJFlFGK4RdetDEsMKi-D_yn9_sEu_9kxoGxaD8ZPIm86xqBnm2Bvh-3i7bOgD5hTOXkY-QItdlk7aIfU0ualmLyUw";
// const accessToken_dudu = "ya29.A0ARrdaM-pzHjjoOReuNuqdFVTcMCreVjFITw2W-75qort8DU3LJ1zkwm4aZeQQ75la774FRg_FsRzi4Hxa7VYd3gMuM18isr7CW0CAgPpYFJoVU7BDfICZLayRbE2QLfn82vhqPXKmVBpEVdz3nn2N9l-DnBFYUNnWUtBVEFTQVRBU0ZRRl91NjFWRzN0TW5UNHlib2VFRTdjeGRMTFZhUQ0163";
// const sub_dudu = "109648348890999991353"

// googlefit.getSteps(accessToken1, sub_dudu).then(resposta => {
//     console.log(resposta);
// })
