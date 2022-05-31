import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const currentClaimFetch = createAsyncThunk(
    "currentClaim/fetch",
    async (param: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim/${param}`,
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
export const currentClaimSlice = createSlice({
    name: "currentClaim",
    initialState: {
        currentClaim: {
            _id: "",
            title: "",
            description: "",
            type: {
                name: "",
                slug: "",
            },
            status: {
                name: "",
                slug: "",
            },
            user: "",
            createdAt: "",
            updatedAt: "",
            __v: 0,
        },
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(currentClaimFetch.fulfilled, (state, action) => {
            console.log("🚀 ~ action", action);
            if ("message" in action.payload && "code" in action.payload) {
                state.error = action.payload.error;
            } else {
                state.currentClaim = action.payload;
            }
        });
    },
});
