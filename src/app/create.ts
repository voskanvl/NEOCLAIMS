import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";

type TCreate = {
    title: string;
    description: string;
    type: string;
    status: string;
};

export const createFetch = createAsyncThunk(
    "create/fetch",
    async (body: TCreate) => {
        console.log("🚀 ~ body", body);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim`,
                {
                    method: "POST",
                    body: JSON.stringify(body),
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

export const createClaimSlice = createSlice({
    name: "create",
    initialState: {
        created: {} as TClaim,
        error: "",
    },
    reducers: {
        clear: state => {
            state.created = {} as TClaim;
        },
    },
    extraReducers: builder => {
        builder.addCase(createFetch.fulfilled, (state, action) => {
            console.log("🚀 ~ action", action);
            if ("message" in action.payload && "code" in action.payload) {
                state.error = action.payload.error;
            } else {
                state.created = action.payload;
            }
        });
    },
});

export const { clear } = createClaimSlice.actions;
