import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TClaim } from "../types/type";
import { RootState } from "./store";

const STEP = 10; //volume claims in request

// export const claimsNextFetch = createAsyncThunk(
//     "claims/next",
//     async (page: number) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(
//                 `${
//                     process.env.REACT_APP_API_SERVER
//                 }/claim?limit=${STEP}&offset=${page * STEP}`,
//                 {
//                     headers: {
//                         "Authorization": "Bearer " + token,
//                         "Content-Type": "application/json",
//                     },
//                     mode: "cors",
//                 },
//             );
//             const result = await response.json();
//             console.log("🚀 ~ result", result);
//             return result;
//         } catch (error) {
//             return error;
//         }
//     },
// );
export const claimsFetch = createAsyncThunk(
    "claims/fetch",
    async (page?: number | undefined, thunkApi?) => {
        page = page || 0;
        try {
            const STEP = (thunkApi.getState() as RootState).claims
                .claimsPerPage;
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${
                    process.env.REACT_APP_API_SERVER
                }/claim?limit=${STEP}&offset=${page * STEP}`,
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
                state.page = action.meta.arg ?? 0;
                state.claims = action.payload.claims;
                state.totalItems = action.payload.totalItems;
            }
        });
        // builder.addCase(claimsNextFetch.fulfilled, (state, action) => {
        //     console.log("🚀 ~ claimsNextFetch.fulfilled action", action);
        //     if ("message" in action.payload && "code" in action.payload) {
        //         state.error = action.payload.error;
        //     } else {
        //         state.page = action.meta.arg;
        //         state.claims = action.payload.claims;
        //         state.totalItems = action.payload.totalItems;
        //     }
        // });
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
