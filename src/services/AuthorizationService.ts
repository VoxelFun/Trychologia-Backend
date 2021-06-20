import expressBasicAuth from "express-basic-auth";
import { LogInRequest } from "../library/api/LogIn";
import AuthorizationRepository from "../repositories/AuthorizationRepository";

const AuthorizationService = {

    async verifyUser(logInRequest: LogInRequest) {
        const dbUser = await AuthorizationRepository.selectByEmail(logInRequest.email);
        if(!dbUser)
            return false;
        return expressBasicAuth.safeCompare(logInRequest.password, dbUser.passwd);
    }

};

export default AuthorizationService;