import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";

export const claimsFetch = createAsyncThunk("claims/fetch", async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/claim?limit=10`,
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
export const claimsSearch = createAsyncThunk(
    "claims/search",
    async (search: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim?search=${search}`,
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
        error: "",
    },
    reducers: {
        add: (state, action) => {
            state.claims.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(claimsFetch.fulfilled, (state, action) => {
            if ("message" in action.payload && "code" in action.payload) {
                state.error = action.payload.error;
            } else {
                state.claims = action.payload.claims;
                state.totalItems = action.payload.totalItems;
            }
        });
        builder.addCase(claimsSearch.fulfilled, (state, action) => {
            if ("message" in action.payload && "code" in action.payload) {
                state.error = action.payload.error;
            } else {
                state.claims = action.payload.claims;
            }
        });
    },
});

export const { add } = claimsSlice.actions;
