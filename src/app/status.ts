import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const statusFetch = createAsyncThunk("status/fetch", async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/status`,
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
