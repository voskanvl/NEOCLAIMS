import {
    ActionReducerMapBuilder,
    AsyncThunk,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { fullfilledHandler } from "./fullfilledHandler";
import { request } from "./request";

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
export type TReg = { email: string; password: string; fullName: string };

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

export const regFetch: AsyncThunk<any, TReg, {}> = createAsyncThunk(
    "user/reg",
    async ({ email, password, fullName }, { rejectWithValue }) => {
        try {
            return await request("registration", { email, password, fullName });
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const loginFetch: AsyncThunk<
    any,
    { email: string; password: string },
    {}
> = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            return await request("login", { email, password });
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const currentUser = createAsyncThunk("user/user", async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/${id}`,
            {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                mode: "cors",
            },
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
});
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
