
export default class SqlResult {

    constructor(private value: any) {
    }

    getAffectedRows() {
        return this.value.affectedRows;
    }

    getInsertId() {
        return this.value.insertId;
    }
    
    public isPresent() {
        return this.value.length >= 0;
    }
    
    public toObject<T>() {
        return new SqlObjectMapper<T>(this.value).getObject();
    }

    public tryToObject<T>() {
        return new SqlObjectMapper<T>(this.value).tryGetObject();
    }

    public toObjects<T>() {
        return new SqlObjectMapper<T>(this.value).getObjects();
    }

}

class SqlObjectMapper<T> {
    private readonly keys: string[];
    private readonly newKeys: string[];
    private index: number = 0;

    constructor(private value: any) {
        this.keys = value.length > 0 ? Object.keys(value[0]) : [];
        this.newKeys = this.keys.map(key => this.getColumnNameAsVariableName(key));
    }

    private getColumnNameAsVariableName(name: string) {
        const parts = name.split("_");
        let result = parts[0];
        for(let i = 1; i < parts.length; i++)
            result += parts[i].substr(0, 1).toUpperCase() + parts[i].substr(1);
        return result;
    }

    public getObject(): T {
        const value = this.value[this.index++];
        return Object.fromEntries(this.keys.map((key, i) => {
            return [this.newKeys[i], value[key]];
        })) as T;
    }

    public tryGetObject(): T | undefined {
        if(this.isUndefined())
            return undefined;
        return this.getObject();
    }

    public getObjects(): T[] {
        const result = [];
        while(this.value.length > this.index)
            result.push(this.getObject());
        return result;
    }

    private isUndefined() {
        return this.keys.length === 0;
    }

}



