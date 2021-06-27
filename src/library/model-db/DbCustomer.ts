import { Customer } from "../model/Customer";

export type DbCustomer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    visitId: number;
};

export const DbCustomer = {
    fromApi(visitId: number, customer: Customer): DbCustomer {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            visitId
        };
    },

    toApi(customer: DbCustomer): Customer {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        };
    }
};