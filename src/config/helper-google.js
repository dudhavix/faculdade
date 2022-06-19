const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    generateAuthUrl: async () => {
        return client.generateAuthUrl({
            access_type: "offline",
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.CALLBACK_URL,
            scope: process.env.SCOPES,
        });
    }
}