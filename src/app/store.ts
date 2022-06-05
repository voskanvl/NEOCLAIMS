import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { loginSlice } from "./login";
import { claimsSlice } from "./claims";
import { currentClaimSlice } from "./claim";
import { typeSlice } from "./type";
import { createClaimSlice } from "./create";
import { showAside } from "./showAside";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        claims: claimsSlice.reducer,
        currentClaim: currentClaimSlice.reducer,
        type: typeSlice.reducer,
        create: createClaimSlice.reducer,
        counter: counterReducer,
        aside: showAside.reducer,
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
