import { HashMap } from "./Delegate";

export const CollectionUtils = {

    toHashMap<T, TKey extends number | string, TValue>(values: T[], getKey: (value: T) => TKey, getValue: (value: T) => TValue): HashMap<TKey, TValue> {
        const result: any = {};
        values.forEach(value => result[getKey(value)] = getValue(value));
        return result;
    }
    
};