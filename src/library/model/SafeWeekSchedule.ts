import { SafeVisitsHolder } from "./SafeVisitsHolder";
import { WeekScheduleGeneral } from "./WeekSchedule";


export type SafeWeekSchedule = WeekScheduleGeneral<SafeVisitsHolder> & {
    
};