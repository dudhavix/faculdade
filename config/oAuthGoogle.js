const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = {
    verify: async function(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const getAttributes = ticket.getAttributes();
        const getUserId = ticket.getUserId();
        // console.log({getAttributes});
        // console.log({getUserId});
        const getAccessToken = await client.getAccessToken();
        console.log({getAccessToken});
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    },
    generateAuthUrl: async function(){
        const url = await client.generateAuthUrl({
            access_type: "offline",
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.CALLBACK_URL,
            scope: process.env.SCOPES,
        });
        return url;
    }
};

