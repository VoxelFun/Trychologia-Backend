
export default class Parser {
    private pos: number;

    constructor(private readonly str: string) {

    }

    public getChar() {
        return this.str.charAt(this.pos++);
    }

    public isEnd() {
        return this.pos >= this.str.length;
    }

    private return(amount: number) {
        this.pos -= amount;
    }
}