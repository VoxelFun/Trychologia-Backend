
function valid(value: any) {
	if(typeof value === 'number' || value === null || typeof value === 'boolean')
		return value;
	return `'${value}'`;
}

class SqlBuilder {

	private str = ``;

	private add(v: string) {
		this.str += v;
		return this;
	}

	public get() {
		return this.str;
	}

	public count(tableName: string) {
		return this.select(tableName, [`count(*)`]);
	}
	
	public delete(tableName: string) {
		return this.add(`DELETE FROM ${tableName}`);
	}

	public insert(tableName: string, columns: string[], values: any[]) {
		const columnsStr = this.join(columns);
		let i = 0;
		for(const value of values){
			values[i] = valid(value);
			i = i + 1;
		}
		const valuesStr = this.join(values);
		return this.add(`INSERT INTO ${tableName} (${columnsStr}) VALUES (${valuesStr})`);
	}
	
	public select(tableName: string, columns: string[]) {
		return this.add(`SELECT ${this.join(columns)} FROM ${tableName}`);
	}

    public selectAll(tableName: string) {
		return this.add(`SELECT * FROM ${tableName}`);
	}

	public selectMany(columns: string[], tablesToJoin: any[]) {
		let lastConnector = "";
        let result = lastConnector;
		for(const table of tablesToJoin){
			const name = table[0];
			const connector = table[1];
			
			if(result == ``){
				result = name;
				lastConnector = connector;
			}
			else {
				result += ` JOIN ${name} on ${lastConnector} = ${connector}`;
				if(table[2])
					lastConnector = table[2];
			}
		}
        // columns = columns.map(c => c + " as " + c.replace(".", ""));
		return this.add(`SELECT ${this.join(columns)} FROM ${result}`);
	}

	public update(tableName: string, column: string, value: any) {
		const equations = `${column} = ${valid(value)}`;
		return this.add(`UPDATE ${tableName} set ${equations}`);
	}

	public updateMany(tableName: string, columns: string[], values: any[]) {
		const result = [];
        for(let i = 0; i < columns.length; i++) {
            result.push(`${columns[i]} = ${valid(values[i])}`);
        }
		return this.add(`UPDATE ${tableName} set ${this.join(result)}`);
	}

	public where(column: string, formula: Formula, value: any) {
		return this.add(` WHERE ${column} ${formula} ${valid(value)}`);
	}
	
	public whereEqual(column: string, value: any) {
		return this.where(column, Formula.EQUAL, value);
	}

    public whereAnyIdEqual(column: string, ids: any[]) {
        let i = 0;
        this.add(` WHERE (`);
        for(const id of ids){
            if(i++ == 0)
                this.add(`${column} = ${id} `);
            else
                this.orEqual(column, id);
		}
        this.add(`)`);
        return this;
    }

	public and(column: string, formula: Formula, value: any) {
		return this.add(` AND ${column} ${formula} ${valid(value)}`);
	}
	
	public andEqual(column: string, value: any) {
		return this.and(column, Formula.EQUAL, value);
	}

    public or(column: string, formula: Formula, value: any) {
		return this.add(` OR ${column} ${formula} ${valid(value)}`);
	}
	
	public orEqual(column: string, value: any) {
		return this.or(column, Formula.EQUAL, value);
	}
	
	public limit(value = 1) {
		return this.add(` LIMIT ${value}`);
	}

	public offset(value: number) {
		return this.add(` OFFSET ${value}`);
	}
	
	public orderBy(column: string, order = Order.ASC) {
		return this.add(` ORDER BY ${column} ${order}`);
	}

	private join(array: string[]) {
		return array.join(",");
	}

}

export enum Formula {
    EQUAL = "="
}

export enum Order {
	ASC = `ASC`,
	DESC = `DESC`
}

export default SqlBuilder;