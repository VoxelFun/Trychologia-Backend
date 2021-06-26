import { DaySchedule } from "../model/DaySchedule";

export type DbDaySchedule = {
    id: number,
    start: number;
    end: number;
    active: boolean,
    weekScheduleId: number;
};

export const DbDaySchedule = {
    fromApi(weekScheduleId: number, daySchedule: DaySchedule): DbDaySchedule {
        return {
            id: daySchedule.id,
            start: daySchedule.start,
            end: daySchedule.end,
            active: daySchedule.active,
            weekScheduleId
        };
    },

    toApi(daySchedule: DbDaySchedule): DaySchedule {
        return {
            id: daySchedule.id,
            start: daySchedule.start,
            end: daySchedule.end,
            active: daySchedule.active
        };
    }
};