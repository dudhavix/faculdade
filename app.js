const GOOGLE_CLIENT_ID = "987882199766-i0n7dhevjdfhv5dggffecdivqa16ms6q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const HOST = "http://localhost:3030";
const HOST_REDIRECT = `${HOST}/oauth2callback`;
const SCOPES = ["openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read"];

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3030;
const path = require("path");
const request = require("request");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const moment = require("moment");
const { isEmpty } = require("lodash");
const { google } = require("googleapis");

const renderError = require("./helper/renderError");

app.use(cors());
app.use(cookieParser());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST_REDIRECT);


app.get("/", (req, res) => {
    res.redirect("/oauth");
})

app.get("/oauth", (req, res) => {
    if (!isEmpty(oauth2Client.credentials)) {
        res.redirect("/steps");
    } else {
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userid
            })
        })
        res.redirect(url);
    }
});

app.get("/oauth2callback", (req, res) => {
    const code = req.query.code;
    oauth2Client.getToken(code, (err, token) => {
        oauth2Client.setCredentials(token);
        console.log("Token setado, redirecionamento para /steps");
        res.redirect("/steps")
    });
});

app.get("/steps", async (req, res) => {
    res.render("index", { title: "Health Hub" });
})

app.get("/session", (req, res, next) => {
    axios
        .get("https://www.googleapis.com/fitness/v1/users/me/sessions", { headers: getAuthorization() })
        .then(({ data }) => res.send(data))
        .catch(err => renderError(err, res));
});

app.get("/dataSources", (req, res, next) => {
    axios
        .get("https://www.googleapis.com/fitness/v1/users/me/dataSources", { headers: getAuthorization() })
        .then(({ data }) => res.send(data))
        .catch(err => renderError(err, res));
});

app.get("/aggregate-example", (req, res, next) => {
    const body = {
        aggregateBy: [
            {
                dataTypeName: "com.google.step_count.delta",
                dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }
        ],
        bucketByTime: { durationMillis: 86400000 }, // This is 24 hours
        startTimeMillis: moment().valueOf(), // Define start date
        endTimeMillis: moment().valueOf() // Define end date
    };

    axios
        .post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", body, { headers: getAuthorization() })
        .then(({ data }) => res.send(data))
        .catch(err => renderError(err, res));
});

////////////////////////////////
// Activity data types
// https://developers.google.com/fit/datatypes/activity
////////////////////////////////

app.get("/step_count-delta", (req, res, next) => {
    const body = getAggregateBy("com.google.step_count.delta", "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps", "01062021");

    axios
        .post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", body, { headers: getAuthorization() })
        .then(({ data }) => activityDataMapper.sumTotalAndListAllSteps(res, data))
        .catch(err => renderError(err, res));
});

////////////////////////////////
// Body data types
// https://developers.google.com/fit/datatypes/body
////////////////////////////////

app.get("/heart-rate", (req, res, next) => {
    const body = getAggregateBy("com.google.heart_rate.bpm", "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm", "01062021");

    axios
        .post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", body, { headers: getAuthorization() })
        .then(({ data }) => bodyDataMapper.simpleDataHeartRate(res, data))
        .catch(err => renderError(err, res));
});

////////////////////////////////
// Sleep data type
// https://developers.google.com/fit/datatypes/sleep
////////////////////////////////

app.get("/sleep", (req, res, next) => {
    const body = getAggregateBy("com.google.sleep.segment", "derived:com.google.sleep.segment:com.google.android.gms:merged", "01062021");

    axios
        .post("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", body, { headers: getAuthorization() })
        .then(({ data }) => sleepDataMapper.sleepData(res, data))
        .catch(err => renderError(err, res));
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

function getAuthorization() {
    return { authorization: "Bearer " + oauth2Client.credentials.access_token };
}

function getAggregateBy(dataTypeName, dataSourceId, start = null, end = null, durationMillis = 86400000, format = "DDMMYYYY") {
    return {
        aggregateBy: [{ dataTypeName, dataSourceId }],
        bucketByTime: { durationMillis }, // 86400000 is 24 hours
        startTimeMillis: start ? moment(start, format).valueOf() : moment().valueOf(),
        endTimeMillis: end ? moment(end, format).valueOf() : moment().valueOf()
    };
}
