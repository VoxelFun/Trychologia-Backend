import { DbVisit } from "../library/model-db/DbVisit";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { TableName } from "./tables/TableName";
import VisitTable from "./tables/VisitTable";

const VisitRepository = {

    async deleteAllBetween(visit: DbVisit) {
        (await queryMariaDb(sqlBuilder => sqlBuilder
            .delete(TableName.Visit)
            .add(" WHERE ")
            .add(` (${VisitTable.start} BETWEEN ${visit.start} AND ${visit.end}`)
            .add(` OR ${VisitTable.end} BETWEEN ${visit.start} AND ${visit.end})`)
        ));
    },

    async exists(visit: DbVisit) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.Visit)
            .whereEqual(VisitTable.visit_holder_id, visit.visitsHolderId)
            .add(` AND (${visit.start} BETWEEN ${VisitTable.start} AND ${VisitTable.end}`)
            .add(` OR ${visit.end} BETWEEN ${VisitTable.start} AND ${VisitTable.end})`)
        )).isPresent();
    },

    async insert(dbVisit: DbVisit) {
        dbVisit.id = (await queryMariaDb(sqlBuilder => sqlBuilder
            .insert(
                TableName.Visit,
                [VisitTable.start, VisitTable.end, VisitTable.type, VisitTable.visit_holder_id],
                [dbVisit.start, dbVisit.end, dbVisit.type, dbVisit.visitsHolderId]
            )
        )).getInsertId();
    },

    async selectByVisitsHolderId(visitsHolderId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.Visit)
            .whereEqual(VisitTable.visit_holder_id, visitsHolderId)
            .orderBy(VisitTable.start)
        )).toObjects<DbVisit>();
    },

};

export default VisitRepository;