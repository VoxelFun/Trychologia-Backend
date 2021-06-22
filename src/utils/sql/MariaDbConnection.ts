
import mariaDb from "mariadb";
import { Database } from "../../data/Env";
import Logger from "../Logger";
import SqlBuilder from "./SqlBuilder";
import SqlResult from "./SqlResult";

const pool = mariaDb.createPool({
    host: Database.HOST,
    database: Database.NAME,
    user: Database.USER,
    password: Database.PASSWORD
} as mariaDb.PoolConfig)

async function queryMariaDb(createQuery: (sqlBuilder: SqlBuilder) => void): Promise<SqlResult> {
    const connection = await pool.getConnection();
    
    try {
        const sqlBuilder = new SqlBuilder();
        createQuery(sqlBuilder);
        Logger.devLog(sqlBuilder.get());
        const result = await connection.query(sqlBuilder.get());
        Logger.devLog(result);

        return new SqlResult(result);
    } catch (error) {
        Logger.error(error);
        return new SqlResult(undefined);
    } finally {
        connection.end();
    }
}

export default queryMariaDb;