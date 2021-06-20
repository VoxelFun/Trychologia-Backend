
const SqlUtils = {
    collectIds(items: any[]) {
        return items.map(item => item.id);
    }
}

export default SqlUtils;