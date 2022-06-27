const { default: axios } = require('axios');
const { OAuth2Client } = require('google-auth-library');
const logger = require('./helper-log');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    generateAuthUrl: async () => {
        return client.generateAuthUrl({
            access_type: "offline",
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.CALLBACK_URL,
            scope: process.env.SCOPES,
        });
    },

    generateAuthUrlRefresh: async (params) => {
        const newAccessToken = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: params
        }).catch(error => {
            logger.error("helper-google", "generate_Auth_Url_Refresh", error.response.data.error_description)
        })
        return newAccessToken;

    },

    // refreshAccessToken: async (url) => {
    //     console.log({url});
    //     https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=987882199766-gmlinen7da4cjurg54p15pqa5ghbsh5h.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth2callback&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.heart_rate.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.body.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffitness.activity.read&response_type=code
    //     // const teste = await client.getToken(process.env.GOOGLE_CLIENT_ID);
    //     // console.log(teste);
    //     // return teste
    // },
}