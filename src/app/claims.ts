import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";
import { RootState } from "./store";

export type TFetchArgs = {
    search?: string;
    page?: number | undefined;
};
const claimsFetchCreator = (actionType: string) =>
    createAsyncThunk(
        actionType,
        async (
            { search = "", page = 0 }: TFetchArgs,
            { rejectWithValue, getState },
        ) => {
            page = page || 0;
            const STEP = (getState() as RootState).claims.claimsPerPage;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `${
                        process.env.REACT_APP_API_SERVER
                    }/claim?search=${encodeURIComponent(
                        search,
                    )}&limit=${STEP}&offset=${page * STEP}`,
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
        },
    );
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
    },
    reducers: {
        add: (state, action) => {
            state.claims.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(claimsFetch.fulfilled, (state, action) => {
            state.page = action.meta.arg.page ?? 0;
            state.claims = action.payload.claims;
            state.totalItems = action.payload.totalItems;
        });
        builder.addCase(claimsFetch.rejected, (state, action) => {
            state.error = action.error.name!;
        });
        builder.addCase(claimsPushFetch.fulfilled, (state, action) => {
            state.page = action.meta.arg.page ?? 0;
            state.claims = [...state.claims, ...action.payload.claims];
            state.totalItems = action.payload.totalItems;
        });
        builder.addCase(claimsPushFetch.rejected, (state, action) => {
            state.error = action.error.name!;
        });
    },
});

export const { add } = claimsSlice.actions;
