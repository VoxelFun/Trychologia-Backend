import { Day } from "../utils/Day";
import { VisitsHolderMeta } from "./VisitsHolderMeta";

export type VisitMeta = VisitsHolderMeta & {
    start: number;
    end: number;
};

export const VisitMeta = {
    toPrettyString(visitMeta: VisitMeta) {
        const date = new Day(visitMeta.day).toDate();
        date.add(visitMeta.start, "minutes");
        return date.format("HH:mm DD.MM.YYYY");
    }
}