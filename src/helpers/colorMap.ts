const Type: { type: string; slug: string; color: string }[] = [
    { type: "Hardware", slug: "hard", color: "#7DB59A" },
    { type: "Software", slug: "soft", color: "#FF7675" },
    { type: "Networking", slug: "net", color: "#FDCB6E" },
    { type: "Troubleshooting", slug: "troublesh", color: "#6C5CE7" },
];
const Status: { type: string; slug: string; color: string }[] = [
    { type: "Declined", slug: "decl", color: "#E84393" },
    { type: "New", slug: "new", color: "#6C5CE7" },
    { type: "Done", slug: "done", color: "#00B894" },
    { type: "In progress", slug: "in-progress", color: "#FDCB6E" },
];
const StatusByName: { [key: string]: string } = {
    Declined: "#E84393",
    New: "#6C5CE7",
    Done: "#00B894",
    ["In progress"]: "#FDCB6E",
};
const StatusBySlug: { [key: string]: string } = {
    decl: "#E84393",
    new: "#6C5CE7",
    done: "#00B894",
    ["in-progress"]: "#FDCB6E",
};
const TypeByName: { [key: string]: string } = {
    Hardware: "#7DB59A",
    Software: "#FF7675",
    Networking: "#FDCB6E",
    Troubleshooting: "#6C5CE7",
};
const TypeBySlug: { [key: string]: string } = {
    hard: "#7DB59A",
    soft: "#FF7675",
    net: "#FDCB6E",
    troublesh: "#6C5CE7",
};

export default {
    Type: {
        byName: TypeByName,
        bySlug: TypeBySlug,
    },
    Status: {
        byName: StatusByName,
        bySlug: StatusBySlug,
    },
};
