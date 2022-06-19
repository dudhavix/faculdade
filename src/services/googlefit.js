const axios = require("axios");

const logger = require("../config/helper-log");

module.exports = {
    getSteps: async function (token) {
        axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
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

    mapperData: (data) => {
        const bucketArr = data.data.bucket;
        let newDateList = [];

        for (const item of bucketArr) {
            for (const dataset of item.dataset) {
                for (const point of dataset.point) {
                    newDateList.push({ point });
                }
            }
        }

        return newDateList;
    },
}

function getAuthorization(accessToken) {
    return { authorization: `Bearer ${accessToken}` }
}
