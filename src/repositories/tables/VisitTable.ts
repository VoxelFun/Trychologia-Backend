import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.Visit);

const VisitTable = {
    id: Prefix + "id",
    start: Prefix + "start",
    end: Prefix + "end",
    type: Prefix + "type",
    visit_holder_id: Prefix + "visit_holder_id",
};

export default VisitTable;