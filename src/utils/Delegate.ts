
export type HashMap<TKey extends number | string, TValue> = {
    [key in TKey]: TValue;
}