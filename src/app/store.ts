import {
    configureStore,
    ThunkAction,
    Action,
    createSlice,
    createAsyncThunk,
    AsyncThunk,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const login: AsyncThunk<any, { email: string; password: string }, {}> =
    createAsyncThunk("user/login", async (props, thunkAPI) => {
        const { email, password } = props;
        const response = await fetch("http://macserver.local:3001/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    });

const loginSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action);
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
