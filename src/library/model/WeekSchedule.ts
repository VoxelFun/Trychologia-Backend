import { HashMap } from "../../utils/Delegate";
import { DaySchedule, DummyDaySchedule } from "./DaySchedule";
import { VisitsHolder } from "./VisitsHolder";

export type WeekScheduleGeneral<T> = {
    daySchedules: DaySchedule[];
    visitsHolders: HashMap<number, T>;
}

export type WeekSchedule = WeekScheduleGeneral<VisitsHolder> & {
    id: number;
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
    ],
    visitsHolders: {}
};