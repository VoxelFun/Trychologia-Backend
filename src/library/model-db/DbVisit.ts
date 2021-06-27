import { Customer } from "../model/Customer";
import { Visit } from "../model/Visit";

export type DbVisit = {
    id: number;
    start: number;
    end: number;
    type: number;
    visitsHolderId: number;
};

export const DbVisit = {
    fromApi(visitsHolderId: number, visit: Visit): DbVisit {
        return {
            id: visit.id,
            start: visit.start,
            end: visit.end,
            type: visit.type,
            visitsHolderId
        };
    },

    toApi(visit: DbVisit, customer: Customer | undefined): Visit {
        return {
            id: visit.id,
            start: visit.start,
            end: visit.end,
            type: visit.type,
            customer: customer
        };
    }
};