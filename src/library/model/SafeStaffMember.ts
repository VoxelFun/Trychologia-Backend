import { SafeWeekSchedule } from "./SafeWeekSchedule";
import { StaffMemberGeneral } from "./StaffMember";

export type SafeStaffMember = StaffMemberGeneral<SafeWeekSchedule> & {
};