import { Customer } from "./Customer";
import { SafeVisit } from "./SafeVisit";

export type Visit = SafeVisit & {
    id: number;
    type: number;
    customer?: Customer;
};

export enum VisitType {
    FREE, CUSTOMER
}

// export const VisitType1 = {
//     UNAVAILABLE: -1,
//     FREE: 0,
//     CUSTOMER: 1
// } as const;

// type values = typeof VisitType1[keyof typeof VisitType1];
// const b: values = VisitType1.CUSTOMER;