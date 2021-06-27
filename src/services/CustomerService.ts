import CustomerRepository from "../repositories/CustomerRepository";
import { Customer } from "../library/model/Customer";
import { DbCustomer } from "../library/model-db/DbCustomer";
import { DbVisit } from "../library/model-db/DbVisit";

const CustomerService = {

    async getCustomer(visitId: number) {
        const customer = await CustomerRepository.selectByCustomersHolderId(visitId);
        return !customer ? undefined : DbCustomer.toApi(customer);
    },

    async getCustomers(visits: DbVisit[]) {
        return Promise.all(visits.map(visit => CustomerService.getCustomer(visit.id)));
    },

    async saveCustomer(staffMemberId: number, Customer: Customer) {
        // const dbCustomer = DbCustomer.fromApi(staffMemberId, Customer);
        // if (dbCustomer.id < 0) {
        //     await CustomerRepository.insert(dbCustomer);
        // } else {
        //     CustomerRepository.update(dbCustomer);
        // }
        // DayScheduleService.saveDaySchedules(dbCustomer.id, Customer.daySchedules);
    }

};

export default CustomerService;