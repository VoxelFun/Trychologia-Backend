require('dotenv').config();

import express from 'express';
import { Database, Network } from './data/Env';
import ApiController from "./controllers/ApiController";
var cors = require("cors");

import session from 'express-session';
const MariaDBStore = require('express-session-mariadb-store');
import * as basicAuth from 'express-basic-auth'

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    store: new MariaDBStore({
        user: Database.USER,
        password: Database.PASSWORD,
        database: Database.NAME
    }),
    secret: process.env.SESSION_KEY
}));

app.use("/api", ApiController);

app.get('/', (_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

app.listen(Network.PORT, () => console.log(`Running on port ${Network.PORT}`));