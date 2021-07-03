import moment from "moment";
import 'moment/locale/pl';
import { StringUtils } from "../../utils/StringUtils";


export class Day {

    public constructor(private value: number) {}

    public getValue(): number {
        return this.value;
    }

    public getWeekday(): number {
        return this.toDate().day();
    }

    public add(days: number): Day {
        this.value += days;
        return this;
    }

    public subtract(days: number): Day {
        this.value -= days;
        return this;
    }

    public toDate() {
        const start = moment("1970-01-01", "YYYY-MM-DD");
        return start.add(this.value, "days");
    }

    public toPrettyString() {
        return StringUtils.upperCaseFirstLetter(this.toDate().format("dddd DD.MM.YYYY"));
    }

    static get now(): Day {
        const start = moment("1970-01-01", "YYYY-MM-DD");
        const today = moment();
        return new Day(today.diff(start, "days"));
    } 

}