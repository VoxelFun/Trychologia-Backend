import { DbWeekSchedule } from "../library/model-db/DbWeekSchedule";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { TableName } from "./tables/TableName";
import WeekScheduleTable from "./tables/WeekScheduleTable";

const WeekScheduleRepository = {

    async exists(staffMemberId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .count(TableName.WeekSchedule)
            .whereEqual(WeekScheduleTable.staff_member_id, staffMemberId)
        )).isPresent();
    },

    async insert(dbWeekSchedule: DbWeekSchedule) {
        dbWeekSchedule.id = (await queryMariaDb(sqlBuilder => sqlBuilder
            .insert(
                TableName.WeekSchedule,
                [WeekScheduleTable.staff_member_id],
                [dbWeekSchedule.staffMemberId]
            )
        )).getInsertId();
    },

    async selectByStaffMemberId(staffMemberId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.WeekSchedule)
            .whereEqual(WeekScheduleTable.staff_member_id, staffMemberId)
        )).tryToObject<DbWeekSchedule>();
    },

    async update(dbWeekSchedule: DbWeekSchedule) {
        // return (await queryMariaDb(sqlBuilder => sqlBuilder
        //     .update(
        //         TableName.WeekSchedule,
        //         WeekScheduleTable.staff_member_id,
        //         dbWeekSchedule.staffMemberId
        //     )
        // ));
    },

};

export default WeekScheduleRepository;