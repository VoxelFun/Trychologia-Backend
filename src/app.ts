require('dotenv').config({path:__dirname+'/./../.env'});

import express from 'express';
import { Database, Network, Session } from './data/Env';
import ApiController from "./controllers/ApiController";
var cors = require("cors");

import session from 'express-session';
const MariaDBStore = require('express-session-mariadb-store');

import passport from "passport";
import { Strategy } from 'passport-local';
import AuthorizationService from './services/AuthorizationService';
import { AuthenticationError } from './library/enum/AuthenticationError';

const app = express();

const corsOptions = {
    origin: function (origin: string, callback: any) {
        if (origin.replace("www.", "") === process.env.FRONTEND_NETWORK_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

passport.use(new Strategy(
    {
        usernameField: "email"
    },
    async (email, password, done) => {
        const user = await AuthorizationService.getUser(email, password);
        return done(user ? null : AuthenticationError.USER_NOT_FOUND, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
    const user = id ? {id: id} : undefined; 
    done(null, user);
});

app.use(session({
    store: new MariaDBStore({
        user: Database.USER,
        password: Database.PASSWORD,
        database: Database.NAME,
        host: Database.HOST
    }),
    secret: Session.KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.post("/api/login", (request, response, next) => {
    passport.authenticate("local", (error, user) => {
        request.login(user, (err) => {
            // console.log(`req.session.passport: ${JSON.stringify(request.session.passport)}`)
            // console.log(`req.user: ${JSON.stringify(request.user)}`);
            if(error === AuthenticationError.USER_NOT_FOUND || err)
                return response.send({ok: false});
            return response.send({ok: true});
        })
    })(request, response, next);
});

app.get("/api/logout", (request, response) => {
    request.logout();
    return response.status(200).json({});
})

app.use("/api", ApiController);

app.get('/', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

app.listen(Network.PORT, () => console.log(`Running on port ${Network.PORT}`));