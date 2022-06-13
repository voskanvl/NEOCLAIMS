import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Claim, TClaim } from "../types/type";
import { RootState } from "./store";

export type TFetchArgs = {
    search?: string;
    page?: number | undefined;
};
const claimsFetchCreator = (actionType: string) =>
    createAsyncThunk(actionType, async (_, { rejectWithValue, getState }) => {
        // page = page || 0;
        const { column, page, search, sort, claimsPerPage } = (
            getState() as RootState
        ).claims;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${
                    process.env.REACT_APP_API_SERVER
                }/claim?search=${encodeURIComponent(
                    search,
                )}&limit=${claimsPerPage}&offset=${
                    page * claimsPerPage
                }&column=${column}&sort=${sort}`,
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
            return rejectWithValue(error);
        }
    });
export const claimsFetch = claimsFetchCreator("claims/fetch");
export const claimsPushFetch = claimsFetchCreator("claims/push");

export const claimsSlice = createSlice({
    name: "claims",
    initialState: {
        claims: [] as TClaim[],
        totalItems: 0,
        claimsPerPage: 10,
        page: 0,
        error: "",
        search: "",
        column: "",
        sort: "asc",
        loading: false,
    },
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
            console.log("🚀 ~ action.payload", action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(claimsFetch.fulfilled, (state, action) => {
            state.claims = action.payload.claims;
            state.totalItems = action.payload.totalItems;
            state.loading = false;
        });
        builder.addCase(claimsFetch.rejected, (state, action) => {
            state.error = action.error.name!;
            state.loading = false;
        });
        builder.addCase(claimsFetch.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(claimsPushFetch.fulfilled, (state, action) => {
            state.claims = [...state.claims, ...action.payload.claims];
            state.totalItems = action.payload.totalItems;
            state.loading = false;
        });
        builder.addCase(claimsPushFetch.rejected, (state, action) => {
            state.error = action.error.name!;
            state.loading = false;
        });
        builder.addCase(claimsPushFetch.pending, (state, action) => {
            state.loading = true;
        });
    },
});

export const { page, sort, search, column } = claimsSlice.actions;
