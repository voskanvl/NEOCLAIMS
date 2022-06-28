export function shallowFlat(x: object, name: string) {
    return Object.entries(x).reduce((acc, [key, value]) => {
        if (value && typeof value === "object") value = value[name]
        return { ...acc, [key]: value }
    }, {})
}
