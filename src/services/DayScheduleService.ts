import DayScheduleRepository from "../repositories/DayScheduleRepository";
import { DaySchedule } from "../library/model/DaySchedule";
import { DummyWeekSchedule } from "../library/model/WeekSchedule";
import { DbDaySchedule } from "../library/model-db/DbDaySchedule";

const DayScheduleService = {

    async getDaySchedules(weekScheduleId: number) {
        let daySchedules = await DayScheduleRepository.selectByWeekScheduleId(weekScheduleId);
        if(!daySchedules.length)
            return DummyWeekSchedule.daySchedules;
        return daySchedules.map(daySchedule => DbDaySchedule.toApi(daySchedule));
    },

    async saveDaySchedules(weekScheduleId: number, daySchedules: DaySchedule[]) {
        daySchedules.forEach((daySchedule, i) => {
            const dbDaySchedule = DbDaySchedule.fromApi(weekScheduleId, daySchedule);
            if (dbDaySchedule.id < 0) {
                DayScheduleRepository.insert(dbDaySchedule, i);
            } else {
                DayScheduleRepository.update(dbDaySchedule);
            }
        });
    }

};

export default DayScheduleService;