import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { fullfilledHandler } from "./fullfilledHandler";
import { loginFetch } from "./loginThunks/loginFetch";
import { regFetch } from "./loginThunks/regFetch";
import { currentUser } from "./loginThunks/currentUser";

export type TUser = {
    token: string;
    role: {
        name: string;
        slug: string;
    };
    user_id: string;
    fullName: string;
    email: string;
    error?: string | object;
};
export type TError = { message: string; code: string };

const inCaseError = (
    state: StateType,
    action: {
        type: string;
        payload?: any;
        error: { name?: string; message?: string; code?: string };
    },
) => {
    state.user.error =
        action.error.name || action.error.message || action.error.code || "";
};

export const loginSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            token: "",
            role: {
                name: "",
                slug: "",
            },
            user_id: "",
            fullName: "",
            email: "",
            error: "",
        },
    },
    reducers: {},
    extraReducers: builder => {
        asyncThunkCase(builder)(regFetch);
        asyncThunkCase(builder)(loginFetch);
        asyncThunkCase(builder)(currentUser);
    },
});

const asyncThunkCase =
    (builder: ActionReducerMapBuilder<any>) => (thunk: any) => {
        builder.addCase(thunk.fulfilled, fullfilledHandler);
        builder.addCase(thunk.rejected, inCaseError);
    };

type StateType = ReturnType<typeof loginSlice.getInitialState>;
