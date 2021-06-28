import { DbStaffMember } from "../library/model-db/DbStaffMember";
import { SafeStaffMember } from "../library/model/SafeStaffMember";
import { StaffMember } from "../library/model/StaffMember";
import StaffMemberRepository from "../repositories/StaffMemberRepository";
import WeekScheduleService from "./WeekScheduleService";

const StaffMemberService = {

    async getSaveStaffMembers() {
        const staffMembers = await StaffMemberService.getStaffMembers();
        return StaffMemberService.toSafeStaffMembers(staffMembers);
    },

    async getStaffMember(userId: number) {
        const staffMember = await StaffMemberRepository.selectByUserId(userId);
        const weekSchedule = await WeekScheduleService.getWeekSchedule(staffMember.id);
        return DbStaffMember.toApi(staffMember, weekSchedule);
    },

    async getStaffMemberId(userId: number) {
        const staffMember = await StaffMemberRepository.selectByUserId(userId);
        return staffMember.id;
    },

    async getStaffMembers() {
        const staffMembers = await StaffMemberRepository.selectAll();
        const weekSchedules = await Promise.all(staffMembers.map(staffMember => WeekScheduleService.getWeekSchedule(staffMember.id)));
        return staffMembers.map((staffMember, i) => DbStaffMember.toApi(staffMember, weekSchedules[i]));
    },

    async setStaffMember(staffMember: StaffMember) {
        const dbStaffMember = DbStaffMember.fromApi(staffMember);
        await StaffMemberRepository.update(dbStaffMember);
    },

    toSafeStaffMembers(staffMembers: StaffMember[]): SafeStaffMember[] {
        return staffMembers.map(staffMember => ({
            name: staffMember.name,
            description: staffMember.description,
            weekSchedule: WeekScheduleService.toSafeWeekSchedule(staffMember.weekSchedule)
        }));
    },

};

export default StaffMemberService;