import { HashMap } from "../../utils/Delegate";
import { DaySchedule, DummyDaySchedule } from "./DaySchedule";
import { VisitsHolder } from "./VisitsHolder";

export type WeekSchedule = {
    id: number;
    daySchedules: DaySchedule[];
    visitsHolders: HashMap<number, VisitsHolder>;
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