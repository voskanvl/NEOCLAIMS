import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { Claim, TClaim } from "../types/types";
import { createFetchOption } from "./createFetchOption";
import { RootState } from "./store";

export type TFetchArgs = {
    search?: string;
    page?: number | undefined;
};
const claimsFetchCreator = (actionType: string) =>
    createAsyncThunk(actionType, async (_, { rejectWithValue, getState }) => {
        const { column, page, search, sort, claimsPerPage } = (
            getState() as RootState
        ).claims;
        try {
            const option = createFetchOption();
            const response = await fetch(
                `${
                    process.env.REACT_APP_API_SERVER
                }/claim?search=${encodeURIComponent(
                    search,
                )}&limit=${claimsPerPage}&offset=${
                    page * claimsPerPage
                }&column=${column}&sort=${sort}`,
                option,
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    });
export const claimsFetch = claimsFetchCreator("claims/fetch");
export const claimsPushFetch = claimsFetchCreator("claims/push");

const initialState = {
    claims: [] as TClaim[],
    totalItems: 0,
    claimsPerPage: 10,
    page: 0,
    error: "",
    search: "",
    column: "",
    sort: "asc",
    loading: false,
};

type typeState = typeof initialState;

const inCaseError = (
    state: { error: any; loading: boolean },
    action: { error: { name?: string; message?: string; code?: string } },
) => {
    state.error =
        action.error.name || action.error.message || action.error.code || "";
    state.loading = false;
};

const inCasePending = (state: WritableDraft<typeState>) => {
    state.loading = true;
};

const inCaseFulfilled =
    (
        saveToClaims: (
            claims: typeState,
            payload: { payload: TClaim[] },
        ) => void,
    ) =>
    (
        state: typeState,
        action: PayloadAction<
            any,
            string,
            { arg: void; requestId: string; requestStatus: "fulfilled" },
            never
        >,
    ) => {
        saveToClaims(state, action.payload);
        state.totalItems = action.payload.totalItems;
        state.loading = false;
    };

export const claimsSlice = createSlice({
    name: "claims",
    initialState,
    reducers: {
        search: (state, action: { type: string; payload: string }) => {
            state.search = action.payload;
        },
        page: (state, action: { type: string; payload: number }) => {
            state.page = action.payload || 0;
        },
        column: (state, action: { type: string; payload: keyof Claim }) => {
            state.column = action.payload;
        },
        sort: (state, action: { type: string; payload: "asc" | "desc" }) => {
            state.sort = action.payload;
        },
        reset: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(
            claimsFetch.fulfilled,
            inCaseFulfilled((state: typeState, payload: any) => {
                state.claims = payload.claims;
            }),
        );
        builder.addCase(claimsFetch.rejected, inCaseError);
        builder.addCase(claimsFetch.pending, inCasePending);
        builder.addCase(
            claimsPushFetch.fulfilled,
            inCaseFulfilled(
                (state: typeState, payload: any) =>
                    (state.claims = [...state.claims, payload.claims]),
            ),
        );
        builder.addCase(claimsPushFetch.rejected, inCaseError);
        builder.addCase(claimsPushFetch.pending, inCasePending);
    },
});

export const { page, sort, search, column, reset } = claimsSlice.actions;
