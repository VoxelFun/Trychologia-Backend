import { Day } from "../utils/Day";

export type VisitMeta = {
    day: number;
    minutes: number;
    weekSchedulerId: number;
};

export const VisitMeta = {
    toPrettyString(visitMeta: VisitMeta) {
        const date = new Day(visitMeta.day).toDate();
        date.add(visitMeta.minutes, "minutes");
        return date.format("HH:mm DD.MM.YYYY");
    }
}