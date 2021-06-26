import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.WeekSchedule);

const WeekScheduleTable = {
    id: Prefix + "id",
    staff_member_id: Prefix + "staff_member_id"
};

export default WeekScheduleTable;