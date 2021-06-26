import { DbDaySchedule } from "../library/model-db/DbDaySchedule";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { TableName } from "./tables/TableName";
import DayScheduleTable from "./tables/DayScheduleTable";

const DayScheduleRepository = {

    async insert(dbDaySchedule: DbDaySchedule, dayId: number) {
        dbDaySchedule.id = (await queryMariaDb(sqlBuilder => sqlBuilder
            .insert(
                TableName.DaySchedule,
                [DayScheduleTable.start, DayScheduleTable.end, DayScheduleTable.active, DayScheduleTable.week_schedule_id, DayScheduleTable.dayId],
                [dbDaySchedule.start, dbDaySchedule.end, dbDaySchedule.active, dbDaySchedule.weekScheduleId, dayId]
            )
        )).getInsertId();
    },
    
    async selectByWeekScheduleId(weekScheduleId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.DaySchedule)
            .whereEqual(DayScheduleTable.week_schedule_id, weekScheduleId)
            .orderBy(DayScheduleTable.dayId)
        )).toObjects<DbDaySchedule>();
    },

    async update(dbDaySchedule: DbDaySchedule) {
        (await queryMariaDb(sqlBuilder => sqlBuilder
            .updateMany(
                TableName.DaySchedule,
                [DayScheduleTable.start, DayScheduleTable.end, DayScheduleTable.active],
                [dbDaySchedule.start, dbDaySchedule.end, dbDaySchedule.active]
            ).whereEqual(DayScheduleTable.id, dbDaySchedule.id)
        ));
    },

};

export default DayScheduleRepository;