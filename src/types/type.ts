export type TOid = { $oid: string };
export type TClaim = {
    _id: TOid;
    title: string;
    description: string;
    type: TOid;
    status: TOid;
    user: TOid;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TRoles = {
    _id: TOid;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TStatus = {
    _id: TOid;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TTypes = {
    _id: TOid;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TUsers = {
    _id: TOid;
    fullName: string;
    email: string;
    password: string;
    role: TOid;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
