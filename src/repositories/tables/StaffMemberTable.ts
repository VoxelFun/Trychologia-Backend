import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.StaffMember);

const StaffMemberTable = {
    id: Prefix + "id",
    name: Prefix + "name",
    description: Prefix + "description",
    user_id: Prefix + "user_id",
};

export default StaffMemberTable;