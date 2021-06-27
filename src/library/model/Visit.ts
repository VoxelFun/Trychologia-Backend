import { Customer } from "./Customer";

export type Visit = {
    id: number;
    start: number;
    end: number;
    type: number;
    customer?: Customer;
};