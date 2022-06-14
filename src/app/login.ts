import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

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
    // if ("message" in action.payload) state.user.error = action.payload.message;
};

export const regFetch: AsyncThunk<any, TReg, {}> = createAsyncThunk(
    "user/reg",
    async ({ email, password, fullName }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/auth/registration`,
                {
                    method: "POST",
                    body: JSON.stringify({ email, password, fullName }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const result = await response.json();
            return result;
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
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const result = await response.json();
            return result;
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
        builder.addCase(regFetch.fulfilled, (state, action) => {
            state.user = action.payload;
            if (action.payload.token) {
                //сохраняем токен и время получения
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("created", Date.now().toString());
            }
        });
        builder.addCase(regFetch.rejected, inCaseError);
        builder.addCase(loginFetch.fulfilled, (state, action) => {
            state.user = action.payload;
            if (action.payload.token) {
                //сохраняем токен и время получения
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("created", Date.now().toString());
            }
        });
        builder.addCase(loginFetch.rejected, inCaseError);
        builder.addCase(currentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            if (action.payload.token) {
                //сохраняем токен и время получения
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("created", Date.now().toString());
            }
        });
        builder.addCase(currentUser.rejected, inCaseError);
    },
});
type StateType = ReturnType<typeof loginSlice.getInitialState>;
