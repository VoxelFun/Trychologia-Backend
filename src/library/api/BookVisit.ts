import { Customer } from "../model/Customer";
import { VisitMeta } from "../model/VisitMeta";

export function getBookVisitRoute() {
    return "safe/customer/visit/book";
}

export interface BookVisitRequest extends VisitMeta {
    customer: Customer;
}