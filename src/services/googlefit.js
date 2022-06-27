const axios = require("axios");
const helperGoogle = require("../config/helper-google");
const moment = require("moment");

const logger = require("../config/helper-log");

module.exports = {
    getSteps: async function (token) {
        const steps = await axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": new Date(new Date().toDateString()).getTime(),
            "endTimeMillis": new Date().getTime()
        }, { headers: getAuthorization(token) }).then(resposta => {
            return resposta;
        }).catch(error => {
            logger.error("googlefitService", "getSteps", error);
            return false;
        });
        return steps;
    },

    getStepsWeek: async function (token) {
        const steps = await axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": new Date(moment().day(-7).hour(0).minute(0).millisecond(0)).getTime(),
            "endTimeMillis": new Date(moment().day(-1).hour(23).minute(59).millisecond(59)).getTime()
        }, { 
            headers: getAuthorization(token) 
        }).catch(async error => {
            logger.error("googlefitService", "testes", error);
            return false;
        });
        return steps;
    },

    getSleep: async function (token) {
        return axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.sleep.segment",
            }],
            "startTimeMillis": new Date("Tue May 21 2022").getTime(),
            "endTimeMillis": new Date("Tue May 22 2022").getTime()
        }, { headers: getAuthorization(token) }).then(resposta => {
            return resposta;
        }).catch(error => {
            logger.error("googlefitService", "getSleep", error);
            return false;
        });
    },

    getHeartRate: async function (token) {
        axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.heart_rate.bpm",
            }],
            "startTimeMillis": new Date("Tue May 21 2022").getTime(),
            "endTimeMillis": new Date("Tue May 22 2022").getTime()
        }, { headers: getAuthorization(token) }).then(resposta => {
            return resposta;
        }).catch(error => {
            logger.error("googlefitService", "getHeartRate", error);
            return false;
        });
    },

    mapperDataSteps: (data) => {
        const bucketArr = data.data.bucket;
        let newDateList = [];
        for (const item of bucketArr) {
            // item.startTimeMillis = new Date(Number(item.startTimeMillis)).toLocaleString()
            // item.endTimeMillis = new Date(Number(item.endTimeMillis)).toLocaleString()
            for (const dataset of item.dataset) {
                if(dataset.point.length == 0){
                    newDateList.push(0);
                }
                for (const point of dataset.point) {
                    console.log(point);
                    for (const value of point.value) {
                        newDateList.push(value.intVal);
                    }
                }
            }
        }

        return newDateList;
    },

    mapperDataHoje: (data) => {
        const bucketArr = data.data.bucket;
        let stepsTotais = 0;

        for (const item of bucketArr) {
            for (const dataset of item.dataset) {
                for (const point of dataset.point) {
                    for (const value of point.value) {
                        stepsTotais = value.intVal;
                    }
                }
            }
        }

        return stepsTotais;
    },
}

function getAuthorization(accessToken) {
    return { authorization: `Bearer ${accessToken}` }
}

async function refreshToken(token) {
    const credenciais = await helperGoogle.refreshAccessToken(token);

}
