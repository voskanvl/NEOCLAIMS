import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { loginSlice } from "./login";
import { claimsSlice } from "./claims";
import { currentClaimSlice } from "./claim";
import { typeSlice } from "./type";
import { createClaimSlice } from "./create";
import { showAside } from "./showAside";
import { statusSlice } from "./status";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        claims: claimsSlice.reducer,
        currentClaim: currentClaimSlice.reducer,
        type: typeSlice.reducer,
        status: statusSlice.reducer,
        create: createClaimSlice.reducer,
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
