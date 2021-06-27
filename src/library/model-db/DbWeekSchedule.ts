import { HashMap } from "../../utils/Delegate";
import { DaySchedule } from "../model/DaySchedule";
import { VisitsHolder } from "../model/VisitsHolder";
import { WeekSchedule } from "../model/WeekSchedule";

export type DbWeekSchedule = {
    id: number;
    staffMemberId: number;
};

export const DbWeekSchedule = {
    fromApi(staffMemberId: number, weekSchedule: WeekSchedule): DbWeekSchedule {
        return {
            id: weekSchedule.id,
            staffMemberId
        };
    },

    toApi(weekSchedule: DbWeekSchedule, daySchedules: DaySchedule[], visitsHolders: HashMap<string, VisitsHolder>): WeekSchedule {
        return {
            id: weekSchedule.id,
            daySchedules,
            visitsHolders
        };
    }
};