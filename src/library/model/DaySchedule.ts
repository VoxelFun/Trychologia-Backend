
export type DaySchedule = {
    id: number,
    start: number;
    end: number;
    active: boolean;
};

export const DummyDaySchedule : DaySchedule = {
    id: -1,
    start: 8 * 60,
    end: 16 * 60,
    active: true
};