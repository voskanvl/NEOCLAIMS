import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const claimsFetch = createAsyncThunk("claims/fetch", async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://macserver.local:3001/claim", {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            mode: "cors",
        });
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
        claims: {
            error: "",
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(claimsFetch.fulfilled, (state, action) => {
            if ("message" in action.payload && "code" in action.payload) {
                state.claims.error = action.payload.error;
            } else {
                state.claims = action.payload.claims;
            }
        });
    },
});
