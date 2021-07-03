
export class Hour {

    constructor(private minutes: number) {

    }

    static fromText(text: string) {
        const values = text.split(':').map(value => parseInt(value));
        return new Hour(values[0] * 60 + values[1]);
    }

    static get now(): Hour {
        const now = new Date();
        return new Hour(now.getHours() * 60 + now.getMinutes());
    } 

    addMinutes(minutes: number) {
        this.minutes += minutes;
    }

    isAfter(other: Hour) {
        return this.minutes > other.minutes;
    }

    isBefore(other: Hour) {
        return this.minutes < other.minutes;
    }

    toMinutes() {
        return this.minutes;
    }

    toText() {
        const hour = Math.floor(this.minutes / 60);
        const minutes = this.minutes - hour * 60;
        return `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? minutes + "0" : minutes}`;
    }

}