import { getTableNameAsPrefix, TableName } from "./TableName";

const Prefix = getTableNameAsPrefix(TableName.Customer);

const CustomerTable = {
    id: Prefix + "id",
    name: Prefix + "name",
    email: Prefix + "email",
    phone: Prefix + "phone",
    visit_id: Prefix + "visit_id",
};

export default CustomerTable;