const axios = require("axios");
const helperGoogle = require("../config/helper-google");
const moment = require("moment");

const logger = require("../config/helper-log");
const helperLog = require("../config/helper-log");

module.exports = {
    getSteps: async function (accessToken) {
        const steps = await axios.post(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": new Date(new Date().toDateString()).getTime(),
            "endTimeMillis": new Date().getTime()
        }, { headers: getAuthorization(accessToken) }).catch(error => {
            helperLog.error("googlefitService", "getSteps", error);
            return false;
        });
        return steps;
    },

    getStepsWeek: async function (accessToken, inicioSemana, fimSemana) {
        const steps = await axios.post(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": new Date(moment().day(inicioSemana).hour(0).minute(0).millisecond(0)).getTime(),
            "endTimeMillis": new Date(moment().day(fimSemana).hour(23).minute(59).millisecond(59)).getTime()
        }, { headers: getAuthorization(accessToken) }).catch(async error => {
            logger.error("googlefitService", "getStepsWeek", error);
            return false;
        });
        return steps;
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