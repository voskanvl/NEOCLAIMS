// export type TOid = { $oid: string };
export type TClaim = {
    _id: string;
    title: string;
    description: string;
    type: {
        name: string;
        slug: string;
    };
    status: {
        name: string;
        slug: string;
    };
    user: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    _v: number;
};
export type TRoles = {
    _id: string;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TStatus = {
    _id: string;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TTypes = {
    _id: string;
    name: string;
    slug: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
export type TUsers = {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    role: string;
    createdAt: { $date: Date };
    updatedAt: { $date: Date };
    _v: number;
};
