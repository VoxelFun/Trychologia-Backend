
export default class Optional<T> {
    private constructor(private value: T) {

    }

    public get() {
        return this.value;
    }

    public isEmpty() {
        return this.value === undefined;
    }

    public isPresent() {
        return this.value !== undefined;
    }

    public static empty() {
        return new Optional(undefined);
    }

    public static of<T>(value: T) {
        return new Optional(value);
    }
}