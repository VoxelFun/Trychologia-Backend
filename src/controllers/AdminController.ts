import * as express from "express";
import basicAuth, { IAsyncAuthorizerOptions } from 'express-basic-auth';
import AuthorizationService from "../services/AuthorizationService";
import Logger from "../utils/Logger";

const router = express.Router();

// const options = {
//     authorizer: AuthorizationService.getUser,
//     authorizeAsync: true
// } as IAsyncAuthorizerOptions;

// router.use(basicAuth(options), (req: basicAuth.IBasicAuthedRequest, res, next) => {
//     Logger.devLog(`Welcome ${req.auth.user} (your password is ${req.auth.password})`);
//     next();
// });

router.get('/', (req, res) => {
res.send('authorized');
});

export = router;