export const BitUtils = {

    getBit(num: number, pos: number) {
        return (num >>> pos) & 1;
    },
    
    getBits(num: number, pos: number, amount: number) {
        let result = 0;
        for (let i = 0; i < amount; i++)
            result |= BitUtils.getBit(num, pos + i) << i;
        return result;
    },

    isBitSet(num: number, pos: number) {
        return BitUtils.getBit(num, pos) !== 0;
    },

    setBit(num: number, pos: number, bit: number) {
        return bit === 0 ? BitUtils.setBit0(num, pos) : BitUtils.setBit1(num, pos);
    },
    
    setBits(num: number, pos: number, bit: number, amount: number) {
        for (let i = 0; i < amount; i++) {
            num = BitUtils.setBit(num, pos + i, bit);
        }
        return num;
    },
    
    setBit0(num: number, pos: number) {
        return num & ~(1 << pos);
    },
    
    setBit1(num: number, pos: number) {
        return num | (1 << pos);
    },
    
    setBitValue(num: number, value: number, pos: number) {
        let condition = 1, i = 0;
        while (value >= condition) {
            num = BitUtils.setBit(num, pos + i, BitUtils.getBit(value, i));
            condition *= 2;
            i++;
        }
        return num;
    },
    
    setFixedLengthBitValue(num: number, value: number, length: number, pos: number) {
        for (let i = 0; i < length; i++)
            num = BitUtils.setBit(num, pos + i, BitUtils.getBit(value, i));
        return num;
    }
    
};