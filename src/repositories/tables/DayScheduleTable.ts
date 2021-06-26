import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.DaySchedule);

const DayScheduleTable = {
    id: Prefix + "id",
    dayId: Prefix + "day_id",
    start: Prefix + "start",
    end: Prefix + "end",
    active: Prefix + "active",
    week_schedule_id: Prefix + "week_schedule_id",
};

export default DayScheduleTable;