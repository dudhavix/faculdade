const axios = require("axios");

module.exports = {
    getSteps: async function (token) {
        return axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.step_count.delta",
                "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketByTime": { "durationMillis": 86400000 },
            "startTimeMillis": new Date("Tue May 24 2022").getTime(),
            "endTimeMillis": new Date().getTime()
        }, { headers: getAuthorization(token) })
    },

    getSleep: async function (token) {
        return axios.post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            "aggregateBy": [{
                "dataTypeName": "com.google.sleep.segment",
            }],
            "startTimeMillis": new Date("Tue May 21 2022").getTime(),
            "endTimeMillis": new Date("Tue May 22 2022").getTime()
        }, { headers: getAuthorization(token) })
    },

    mapperSteps: (data) => {
        const bucketArr = data.data.bucket;
        let heartRateArr = [];

        for (const item of bucketArr) {
            for (const dataset of item.dataset) {
                for (const point of dataset.point) {
                    heartRateArr.push({ point });
                }
            }
        }

        return heartRateArr;
    },

    mapperSleeps: (data) => {
        const bucketArr = data.data.bucket;
        let heartRateArr = [];

        for (const item of bucketArr) {
            for (const dataset of item.dataset) {
                for (const point of dataset.point) {
                    heartRateArr.push({ point });
                }
            }
        }

        return heartRateArr;
    }
}

function getAuthorization(accessToken) {
    return { authorization: `Bearer ${accessToken}` }
}

function getAggregateBy(dataTypeName, dataSourceId, start = null, end = null, durationMillis = 86400000, format = "DDMMYYYY") {
    return {
        aggregateBy: [{ dataTypeName, dataSourceId }],
        bucketByTime: { durationMillis }, // 86400000 is 24 hours
        startTimeMillis: start ? moment(start, format).valueOf() : moment().valueOf(),
        endTimeMillis: end ? moment(end, format).valueOf() : moment().valueOf()
    };
}