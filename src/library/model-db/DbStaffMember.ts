import { StaffMember } from "../model/StaffMember";
import { WeekSchedule } from "../model/WeekSchedule";

export type DbStaffMember = {
    id: number;
    name: string;
    description: string;
};

export const DbStaffMember = {
    fromApi(staffMember: StaffMember): DbStaffMember {
        return {
            id: staffMember.id,
            name: staffMember.name,
            description: staffMember.description
        };
    },
    toApi(staffMember: DbStaffMember, weekSchedule: WeekSchedule): StaffMember {
        return {
            id: staffMember.id,
            name: staffMember.name,
            description: staffMember.description,
            weekSchedule: weekSchedule
        };
    }
};