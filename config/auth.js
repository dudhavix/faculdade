require("dotenv").config();
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

const usuarioService = require("./../services/usuario");

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        passReqToCallback: true,
    },

    async function (request, accessToken, refreshToken, profile, done) {
        let usuario = await usuarioService.findBySub({ sub: profile._json.sub });
        if (usuario) {
            return done(null, {usuario, accessToken});
        } else {
            const novoUsuarioCriadoSucesso = await usuarioService.create(profile._json);
            if(novoUsuarioCriadoSucesso){
                usuario = await usuarioService.findBySub({ sub: profile._json.sub });
            }
            return done(null, {usuario: usuario, accessToken});
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
