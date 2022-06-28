import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/types";
import { shallowFlat } from "../helpers/shallowFlat";
import { createFetchOption } from "./createFetchOption";

export const changeClaimFetch = createAsyncThunk(
    "currentClaim/change",
    async (param: TClaim) => {
        try {
            const option = createFetchOption();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim/${param._id}`,
                {
                    ...option,
                    method: "PUT",
                    body: JSON.stringify(shallowFlat(param, "slug")),
                },
            );
            const result = await response.json();
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
            const option = createFetchOption();
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim/${param}`,
                option,
            );
            const result = await response.json();
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
            if (action.payload instanceof Error) {
                state.error = action.payload.name;
            } else {
                state.currentClaim = action.payload;
            }
        });
        builder.addCase(changeClaimFetch.fulfilled, (state, action) => {});
    },
});
