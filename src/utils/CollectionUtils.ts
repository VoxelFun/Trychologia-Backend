import { HashMap } from "./Delegate";

export const CollectionUtils = {

    toHashMap<T, TKey extends number | string, TValue>(values: T[], getKey: (value: T, i: number) => TKey, getValue: (value: T, i: number) => TValue): HashMap<TKey, TValue> {
        const result: any = {};
        values.forEach((value, i) => result[getKey(value, i)] = getValue(value, i));
        return result;
    }
    
};