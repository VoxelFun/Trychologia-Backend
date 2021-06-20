
import mariaDb from "mariadb";
import { Database } from "../../data/Env";
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
        console.log(sqlBuilder.get());
        const result = await connection.query(sqlBuilder.get());
        console.log(result);

        return new SqlResult(result);
    } catch (error) {
        console.log(error);
        return undefined;
    } finally {
        connection.end();
    }
}

export default queryMariaDb;