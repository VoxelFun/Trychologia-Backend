import VisitsHolderRepository from "../repositories/VisitsHolderRepository";
import { VisitsHolder } from "../library/model/VisitsHolder";
import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";
import VisitService from "./VisitService";
import { CollectionUtils } from "../utils/CollectionUtils";

const VisitsHolderService = {

    async getVisitsHolders(weekScheduleId: number) {
        const visitsHolders = await VisitsHolderRepository.selectByWeekScheduleId(weekScheduleId);
        const visits = await VisitService.getHoldersVisits(visitsHolders);
        return CollectionUtils.toHashMap(
            visitsHolders,
            visitsHolder => visitsHolder.day,
            (visitsHolder, i) => DbVisitsHolder.toApi(visitsHolder, visits[i])
        );
    },

    async saveVisitsHolder(staffMemberId: number, VisitsHolder: VisitsHolder) {
        // const dbVisitsHolder = DbVisitsHolder.fromApi(staffMemberId, VisitsHolder);
        // if (dbVisitsHolder.id < 0) {
        //     await VisitsHolderRepository.insert(dbVisitsHolder);
        // } else {
        //     VisitsHolderRepository.update(dbVisitsHolder);
        // }
        // DayScheduleService.saveDaySchedules(dbVisitsHolder.id, VisitsHolder.daySchedules);
    }

};

export default VisitsHolderService;