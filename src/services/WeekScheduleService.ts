import WeekScheduleRepository from "../repositories/WeekScheduleRepository";
import { DummyWeekSchedule, WeekSchedule } from "../library/model/WeekSchedule";
import DayScheduleService from "./DayScheduleService";
import { DbWeekSchedule } from "../library/model-db/DbWeekSchedule";
import VisitsHolderService from "./VisitsHolderService";

const WeekScheduleService = {

    async getWeekSchedule(staffMemberId: number) {
        const weekSchedule = await WeekScheduleRepository.selectByStaffMemberId(staffMemberId);
        if(!weekSchedule)
            return DummyWeekSchedule;
        const daysSchedulesTask = DayScheduleService.getDaySchedules(weekSchedule.id);
        const visitsHoldersTask = VisitsHolderService.getVisitsHolders(weekSchedule.id);
        return DbWeekSchedule.toApi(weekSchedule, await daysSchedulesTask, await visitsHoldersTask);
    },

    async saveWeekSchedule(staffMemberId: number, weekSchedule: WeekSchedule) {
        const dbWeekSchedule = DbWeekSchedule.fromApi(staffMemberId, weekSchedule);
        if (dbWeekSchedule.id < 0) {
            await WeekScheduleRepository.insert(dbWeekSchedule);
        } else {
            WeekScheduleRepository.update(dbWeekSchedule);
        }
        DayScheduleService.saveDaySchedules(dbWeekSchedule.id, weekSchedule.daySchedules);
    }

};

export default WeekScheduleService;