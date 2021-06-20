
export enum TableName {
    User = "user"
}

export function getTableNameAsPrefix(tableName: TableName) {
    return `${tableName}.`;
}