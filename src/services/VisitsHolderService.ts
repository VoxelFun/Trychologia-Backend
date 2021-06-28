import VisitsHolderRepository from "../repositories/VisitsHolderRepository";
import { VisitsHolder } from "../library/model/VisitsHolder";
import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";
import VisitService from "./VisitService";
import { CollectionUtils } from "../utils/CollectionUtils";
import { SafeVisitsHolder } from "../library/model/SafeVisitsHolder";
import { HashMap } from "../utils/Delegate";

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
    },

    toSafeVisitsHolders(visitsHolders: HashMap<number, VisitsHolder>): HashMap<number, SafeVisitsHolder> {
        const keys = Object.keys(visitsHolders);
        const values = Object.values(visitsHolders);
        return CollectionUtils.toHashMap(
            values,
            (_, i) => keys[i],
            visitsHolder => ({
                visits: VisitService.toSafeVisits(visitsHolder.visits)
            }),
        );
    },

};

export default VisitsHolderService;