import { DbStaffMember } from "../library/model-db/DbStaffMember";
import { StaffMember } from "../library/model/StaffMember";
import StaffMemberRepository from "../repositories/StaffMemberRepository";
import WeekScheduleService from "./WeekScheduleService";

const StaffMemberService = {

    async getStaffMember(userId: number) {
        const staffMember = await StaffMemberRepository.selectByUserId(userId);
        const weekSchedule = await WeekScheduleService.getWeekSchedule(staffMember.id);
        return DbStaffMember.toApi(staffMember, weekSchedule);
    },

    async getStaffMemberId(userId: number) {
        const staffMember = await StaffMemberRepository.selectByUserId(userId);
        return staffMember.id;
    },

    async setStaffMember(staffMember: StaffMember) {
        const dbStaffMember = DbStaffMember.fromApi(staffMember);
        await StaffMemberRepository.update(dbStaffMember);
    },

};

export default StaffMemberService;