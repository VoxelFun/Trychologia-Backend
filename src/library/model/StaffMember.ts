import { WeekSchedule } from "./WeekSchedule";

export type StaffMemberGeneral<T> = {
    name: string;
    description: string;
    weekSchedule: T;
}

export type StaffMember = StaffMemberGeneral<WeekSchedule> & {
    id: number;
};