import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";
import { RootState } from "./store";

export type TFetchArgs = {
    search?: string;
    page?: number | undefined;
};
export const claimsFetch = createAsyncThunk(
    "claims/fetch",
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
            console.log("🚀 ~ result", result);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
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
            if ("message" in action.payload || "code" in action.payload) {
                state.error = action.payload;
            } else {
                state.page = action.meta.arg.page ?? 0;
                state.claims = action.payload.claims;
                state.totalItems = action.payload.totalItems;
            }
        });
        builder.addCase(claimsFetch.rejected, (state, action) => {
            state.error = action.error.name!;
        });
    },
});

export const { add } = claimsSlice.actions;
