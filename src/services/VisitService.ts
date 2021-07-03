import VisitRepository from "../repositories/VisitRepository";
import { Visit } from "../library/model/Visit";
import DayScheduleService from "./DayScheduleService";
import { DbVisit } from "../library/model-db/DbVisit";
import CustomerService from "./CustomerService";
import { DbVisitsHolder } from "../library/model-db/DbVisitsHolder";
import { SafeVisit } from "../library/model/SafeVisit";
import { Hour } from "../library/utils/Hour";
import { Customer } from "../library/model/Customer";

const VisitService = {

    async bookVisit(customer: Customer, dbVisit: DbVisit, today: boolean) {
        const now = Hour.now;
        if(today)
            if(new Hour(dbVisit.start).isBefore(now) || new Hour(dbVisit.end).isBefore(now))
                throw new Error("Incorrect visit hour");
        if(await VisitRepository.exists(dbVisit))
            throw new Error("Visit already exists");
        await VisitRepository.insert(dbVisit);
        await CustomerService.createCustomer(dbVisit.id, customer);
    },

    async getVisits(visitsHolderId: number) {
        const visits = await VisitRepository.selectByVisitsHolderId(visitsHolderId);
        const customers = await CustomerService.getCustomers(visits);
        return visits.map((visit, i) => DbVisit.toApi(visit, customers[i]));
    },

    async getHoldersVisits(visitsHolders: DbVisitsHolder[]) {
        return Promise.all(visitsHolders.map(visitsHolder => VisitService.getVisits(visitsHolder.id)));
    },

    toSafeVisits(visits: Visit[]): SafeVisit[] {
        return visits.map(visit => ({
            start: visit.start,
            end: visit.end
        }));
    },

};

export default VisitService;