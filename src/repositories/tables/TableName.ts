
export enum TableName {
    User = "user",
    WeekSchedule = "week_schedule",
    DaySchedule = "day_schedule",
    StaffMember = "staff_member"
}

export function getTableNameAsPrefix(tableName: TableName) {
    return `${tableName}.`;
}