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
import { SaveVisitsRequest } from "../library/api/SaveVisits";
import { VisitsHolderMeta } from "../library/model/VisitsHolderMeta";
import { DbVisit } from "../library/model-db/DbVisit";

const VisitsHolderService = {

    async bookVisit(data: BookVisitRequest) {
        const [visitsHolder, today] = await VisitsHolderService.tryGetEditableVisitsHolder(data);
        await VisitService.bookVisit(data.customer, {
            id: -1,
            type: VisitType.CUSTOMER,
            end: data.end,
            start: data.start,
            visitsHolderId: visitsHolder.id
        }, today);
    },

    async createVisitsHolder(visitsHolderMeta: VisitsHolderMeta) {
        const visitsHolder: DbVisitsHolder = {
            id: -1,
            day: visitsHolderMeta.day,
            weekScheduleId: visitsHolderMeta.weekSchedulerId
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

    async tryGetEditableVisitsHolder(visitsHolderMeta: VisitsHolderMeta): Promise<[DbVisitsHolder, boolean]> {
        const dayNow = Day.now.getValue();
        if(visitsHolderMeta.day < dayNow)
            throw new Error("Incorrect visit day");
        return [await VisitsHolderService.tryGetVisitsHolder(visitsHolderMeta), visitsHolderMeta.day === dayNow];
    },

    async tryGetVisitsHolder(visitsHolderMeta: VisitsHolderMeta) {
        const visitsHolder = await VisitsHolderRepository.selectByDay(visitsHolderMeta.day);
        if(visitsHolder)
            return visitsHolder;
        return VisitsHolderService.createVisitsHolder(visitsHolderMeta);
    },

    async saveVisits(weekScheduleId: number, data: SaveVisitsRequest) {
        Promise.all(data.visitsHolders.map(async visitsHolder => {
            const [vh, today] = await VisitsHolderService.tryGetEditableVisitsHolder({
                day: visitsHolder.day,
                weekSchedulerId: weekScheduleId
            });
            await Promise.all(visitsHolder.visits.map(visit => {
                VisitService.saveVisit(DbVisit.fromApi(vh.id, visit), today);
            }));
        }));
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