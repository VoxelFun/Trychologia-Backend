import Parser from "./Parser";

export default class SentenceParser {
    private parser: Parser;
    private breakers: Breaker[];

    constructor(str: string, breakers: string[]) {
        this.parser = new Parser(str);
        this.breakers = breakers.map(breaker => new Breaker(breaker));
    }

    getSentence() {
        while(!this.parser.isEnd()) {
            let c = this.parser.getChar();
            for(const breaker of this.breakers) {
                if(c === breaker.getCurrentChar()) {
                    
                }
            }
        }
    }
}

class Breaker {
    private correct: number;

    constructor(private readonly value: string) {

    }
    
    public getCurrentChar() {
        return this.value.charAt(this.correct);
    }
}