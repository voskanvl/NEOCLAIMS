import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFetchOption } from "./createFetchOption";

export const statusFetch = createAsyncThunk("status/fetch", async () => {
    try {
        const option = createFetchOption();
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/status`,
            option,
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
});
export const statusSlice = createSlice({
    name: "status",
    initialState: {
        status: [] as { name: string; slug: string }[],
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(statusFetch.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                state.error = action.payload.name;
            } else {
                state.status = action.payload;
            }
        });
    },
});
