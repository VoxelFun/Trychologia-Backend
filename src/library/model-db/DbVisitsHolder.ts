import { Visit } from "../model/Visit";
import { VisitsHolder } from "../model/VisitsHolder";

export type DbVisitsHolder = {
    id: number;
    day: number;
    weekScheduleId: number;
};

export const DbVisitsHolder = {
    fromApi(weekScheduleId: number, day: number, visitsHolder: VisitsHolder): DbVisitsHolder {
        return {
            id: visitsHolder.id,
            day,
            weekScheduleId
        };
    },

    toApi(visitsHolder: DbVisitsHolder, visits: Visit[]): VisitsHolder {
        return {
            id: visitsHolder.id,
            visits
        };
    }
};