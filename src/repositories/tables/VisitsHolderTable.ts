import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.VisitsHolder);

const VisitsHolderTable = {
    id: Prefix + "id",
    day: Prefix + "day",
    week_schedule_id: Prefix + "week_schedule_id",
};

export default VisitsHolderTable;