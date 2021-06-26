import { WeekSchedule } from "./WeekSchedule";

export type StaffMember = {
    id: number;
    name: string;
    description: string;
    weekSchedule: WeekSchedule;
};