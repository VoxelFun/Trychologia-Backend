import { DbUser } from "../library/model-db/DbUser";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { TableName } from "./tables/TableName";
import UserTable from "./tables/UserTable";


const AuthorizationRepository = {

    async selectByEmail(email: string) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.User)
            .whereEqual(UserTable.email, email)
        )).tryToObject<DbUser>();
    }

};

export default AuthorizationRepository;