import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { loginSlice } from "./login";
import { claimsSlice } from "./claims";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        claims: claimsSlice.reducer,
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
