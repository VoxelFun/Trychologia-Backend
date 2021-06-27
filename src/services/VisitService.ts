import VisitRepository from "../repositories/VisitRepository";
import { Visit } from "../library/model/Visit";
import DayScheduleService from "./DayScheduleService";
import { DbVisit } from "../library/model-db/DbVisit";
import CustomerService from "./CustomerService";
import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";

const VisitService = {

    async getVisits(visitsHolderId: number) {
        const visits = await VisitRepository.selectByVisitsHolderId(visitsHolderId);
        const customers = await CustomerService.getCustomers(visits);
        return visits.map((visit, i) => DbVisit.toApi(visit, customers[i]));
    },

    async getHoldersVisits(visitsHolders: DbVisitsHolder[]) {
        return Promise.all(visitsHolders.map(visitsHolder => VisitService.getVisits(visitsHolder.id)));
    },

    async saveVisit(staffMemberId: number, Visit: Visit) {
        // const dbVisit = DbVisit.fromApi(staffMemberId, Visit);
        // if (dbVisit.id < 0) {
        //     await VisitRepository.insert(dbVisit);
        // } else {
        //     VisitRepository.update(dbVisit);
        // }
        // DayScheduleService.saveDaySchedules(dbVisit.id, Visit.daySchedules);
    }

};

export default VisitService;