const StatusByName: { [key: string]: string } = {
    Declined: "#E84393",
    New: "#6C5CE7",
    Done: "#00B894",
    ["In progress"]: "#FDCB6E",
}
const StatusBySlug: { [key: string]: string } = {
    decl: "#E84393",
    new: "#6C5CE7",
    done: "#00B894",
    ["in-progress"]: "#FDCB6E",
}
const TypeByName: { [key: string]: string } = {
    Hardware: "#7DB59A",
    Software: "#FF7675",
    Networking: "#FDCB6E",
    Troubleshooting: "#6C5CE7",
}
const TypeBySlug: { [key: string]: string } = {
    hard: "#7DB59A",
    soft: "#FF7675",
    net: "#FDCB6E",
    troublesh: "#6C5CE7",
}

export default {
    Type: {
        byName: TypeByName,
        bySlug: TypeBySlug,
    },
    Status: {
        byName: StatusByName,
        bySlug: StatusBySlug,
    },
}
