import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";
import { RootState } from "./store";

const STEP = 10; //volume claims in request

export type TFetchArgs = {
    search?: string;
    page?: number | undefined;
};
export const claimsFetch = createAsyncThunk(
    "claims/fetch",
    async ({ search = "", page = 0 }: TFetchArgs, thunkApi?) => {
        page = page || 0;
        const STEP = (thunkApi.getState() as RootState).claims.claimsPerPage;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${
                    process.env.REACT_APP_API_SERVER
                }/claim?search=${search}&limit=${STEP}&offset=${page * STEP}`,
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
            return error;
        }
    },
);
export const claimsSearch = createAsyncThunk(
    "claims/search",
    async (
        { search, page }: { search: string; page?: number | undefined },
        thunkApi?,
    ) => {
        page = page || 0;
        const STEP = (thunkApi.getState() as RootState).claims.claimsPerPage;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${
                    process.env.REACT_APP_API_SERVER
                }/claim?search=${search}&limit=${STEP}&offset=${page * STEP}`,
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
            return error;
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
        builder.addCase(claimsSearch.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                state.error = action.payload.name;
            } else {
                console.log(action);
                state.page = action.meta.arg.page || 0;
                state.claims = action.payload.claims;
                state.totalItems = action.payload.totalItems;
            }
        });
    },
});

export const { add } = claimsSlice.actions;
