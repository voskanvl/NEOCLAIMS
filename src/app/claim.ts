import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";
import { shallowFlat } from "../helpers/shallowFlat";

export const changeClaimFetch = createAsyncThunk(
    "currentClaim/change",
    async (param: TClaim) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim/${param._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(shallowFlat(param, "slug")),
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
            if (action.payload instanceof Error) {
                state.error = action.payload.name;
            } else {
                state.currentClaim = action.payload;
            }
        });
        builder.addCase(changeClaimFetch.fulfilled, (state, action) => {});
    },
});
