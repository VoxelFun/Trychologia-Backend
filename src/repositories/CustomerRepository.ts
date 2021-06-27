import { DbCustomer } from "../library/model-db/DbCustomer";
import queryMariaDb from "../utils/sql/MariaDbConnection";
import { TableName } from "./tables/TableName";
import CustomerTable from "./tables/CustomerTable";

const CustomerRepository = {

    async insert(dbCustomer: DbCustomer) {
        dbCustomer.id = (await queryMariaDb(sqlBuilder => sqlBuilder
            .insert(
                TableName.Customer,
                [CustomerTable.name, CustomerTable.email, CustomerTable.phone, CustomerTable.visit_id],
                [dbCustomer.name, dbCustomer.email, dbCustomer.phone, dbCustomer.visitId]
            )
        )).getInsertId();
    },

    async selectByCustomersHolderId(visitId: number) {
        return (await queryMariaDb(sqlBuilder => sqlBuilder
            .selectAll(TableName.Customer)
            .whereEqual(CustomerTable.visit_id, visitId)
        )).tryToObject<DbCustomer>();
    },

};

export default CustomerRepository;