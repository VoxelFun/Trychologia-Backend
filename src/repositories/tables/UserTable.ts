import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.User);

const UserTable = {
    id: Prefix + "id",
    email: Prefix + "email",
    passwd: Prefix + "passwd"
};

export default UserTable;