import { DaySchedule } from "../model/DaySchedule";
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

    toApi(weekSchedule: DbWeekSchedule, daySchedules: DaySchedule[]): WeekSchedule {
        return {
            id: weekSchedule.id,
            daySchedules
        };
    }
};