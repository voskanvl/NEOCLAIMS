export function shallowFlat(x: object, name: string) {
    return Object.entries(x).reduce((acc, [key, value]) => {
        if (typeof value === "object") value = value[name];
        return { ...acc, [key]: value };
    }, {});
}
