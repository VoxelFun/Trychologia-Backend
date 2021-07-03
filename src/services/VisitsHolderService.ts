import VisitsHolderRepository from "../repositories/VisitsHolderRepository";
import { VisitsHolder } from "../library/model/VisitsHolder";
import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";
import VisitService from "./VisitService";
import { CollectionUtils } from "../utils/CollectionUtils";
import { SafeVisitsHolder } from "../library/model/SafeVisitsHolder";
import { HashMap } from "../utils/Delegate";
import { VisitMeta } from "../library/model/VisitMeta";
import { BookVisitRequest } from "../library/api/BookVisit";
import { VisitType } from "../library/model/Visit";
import { Day } from "../library/utils/Day";

const VisitsHolderService = {

    async bookVisit(data: BookVisitRequest) {
        const visitsHolder = await VisitsHolderService.tryGetVisitsHolder(data);
        const dayNow = Day.now.getValue();
        if(data.day < dayNow)
            throw new Error("Incorrect visit day");
        await VisitService.bookVisit(data.customer, {
            id: -1,
            type: VisitType.CUSTOMER,
            end: data.end,
            start: data.minutes,
            visitsHolderId: visitsHolder.id
        }, data.day === dayNow);
    },

    async createVisitsHolder(visitMeta: VisitMeta) {
        const visitsHolder: DbVisitsHolder = {
            id: -1,
            day: visitMeta.day,
            weekScheduleId: visitMeta.weekSchedulerId
        };
        await VisitsHolderRepository.insert(visitsHolder);
        return visitsHolder;
    },

    async getVisitsHolders(weekScheduleId: number) {
        const visitsHolders = await VisitsHolderRepository.selectByWeekScheduleId(weekScheduleId);
        const visits = await VisitService.getHoldersVisits(visitsHolders);
        return CollectionUtils.toHashMap(
            visitsHolders,
            visitsHolder => visitsHolder.day,
            (visitsHolder, i) => DbVisitsHolder.toApi(visitsHolder, visits[i])
        );
    },

    async tryGetVisitsHolder(visitMeta: VisitMeta) {
        const visitsHolder = await VisitsHolderRepository.selectByDay(visitMeta.day);
        if(visitsHolder)
            return visitsHolder;
        return VisitsHolderService.createVisitsHolder(visitMeta);
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