import { DbUser } from "../library/model-db/DbUser";
import AuthorizationRepository from "../repositories/AuthorizationRepository";
import bcrypt from "bcrypt";

const AuthorizationService = {

    async getUser(email: string, password: string): Promise<DbUser | undefined> {
        const dbUser = await AuthorizationRepository.selectByEmail(email);
        if(dbUser && (await bcrypt.compare(password, dbUser.passwd)))
            return dbUser;
        return undefined;
    }

};

export default AuthorizationService;