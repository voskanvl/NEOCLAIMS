import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";

export const claimsFetch = createAsyncThunk("claims/fetch", async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/claim`,
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
});
export const claimsSlice = createSlice({
    name: "claims",
    initialState: {
        claims: [] as TClaim[],
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(claimsFetch.fulfilled, (state, action) => {
            if ("message" in action.payload && "code" in action.payload) {
                state.error = action.payload.error;
            } else {
                state.claims = action.payload.claims;
            }
        });
    },
});
