import { WeekSchedule } from "../model/WeekSchedule";

export function getUpdateWeekScheduleRoute() {
    return "admin/week-schedule/update";
}

export interface UpdateWeekScheduleRequest {
    weekSchedule: WeekSchedule;
}

export interface UpdateWeekScheduleResponse {
    ok: boolean;
}