import {
    configureStore,
    ThunkAction,
    Action,
    createSlice,
    createAsyncThunk,
    AsyncThunk,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

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

export const login: AsyncThunk<any, { email: string; password: string }, {}> =
    createAsyncThunk("user/login", async (props, thunkAPI) => {
        const { email, password } = props;
        try {
            const response = await fetch(
                "http://macserver.local:3001/auth/login",
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
            return error;
        }
    });

const loginSlice = createSlice({
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
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("🚀 ~ action", action);
            if ("message" in action.payload && "code" in action.payload) {
                state.user.error = action.payload;
            } else {
                state.user = action.payload;
                localStorage.setItem("token", action.payload.token);
            }
        });
    },
});

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        counter: counterReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
