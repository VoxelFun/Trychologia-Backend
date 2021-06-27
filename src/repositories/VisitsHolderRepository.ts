import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";
import { Day } from "../library/utils/Day";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { Formula } from "../utils/sql/SqlBuilder";
import { TableName } from "./tables/TableName";
import VisitsHolderTable from "./tables/VisitsHolderTable";

const VisitsHolderRepository = {

    async insert(dbVisitsHolder: DbVisitsHolder) {
        dbVisitsHolder.id = (await queryMariaDb(sqlBuilder => sqlBuilder
            .insert(
                TableName.VisitsHolder,
                [VisitsHolderTable.day, VisitsHolderTable.week_schedule_id],
                [dbVisitsHolder.day, dbVisitsHolder.weekScheduleId]
            )
        )).getInsertId();
    },

    async selectByWeekScheduleId(weekScheduleId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.VisitsHolder)
            .whereEqual(VisitsHolderTable.week_schedule_id, weekScheduleId)
            .and(VisitsHolderTable.day, Formula.BIGGER_OR_EQUAL, Day.now.subtract(1).getValue())
            .orderBy(VisitsHolderTable.day)
        )).toObjects<DbVisitsHolder>();
    },

};

export default VisitsHolderRepository;