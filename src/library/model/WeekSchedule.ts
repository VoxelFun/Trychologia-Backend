import { DaySchedule, DummyDaySchedule } from "./DaySchedule";

export type WeekSchedule = {
    id: number;
    daySchedules: DaySchedule[];
};

const NonActiveDummyDaySchedule = {
    ...DummyDaySchedule,
    active: false
}

export const DummyWeekSchedule : WeekSchedule = {
    id: -1,
    daySchedules: [
        DummyDaySchedule,
        DummyDaySchedule,
        DummyDaySchedule,
        DummyDaySchedule,
        DummyDaySchedule,
        NonActiveDummyDaySchedule,
        NonActiveDummyDaySchedule
    ]
};