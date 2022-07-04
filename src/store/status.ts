import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createFetchOption } from "./createFetchOption"

export const statusFetch = createAsyncThunk("status/fetch", async (_, { rejectWithValue }) => {
    try {
        const option = createFetchOption()
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/status`,
            option,
        )
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const statusSlice = createSlice({
    name: "status",
    initialState: {
        status: [] as { name: string; slug: string }[],
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(statusFetch.fulfilled, (state, action) => {
            state.status = action.payload
        })
        builder.addCase(statusFetch.rejected, (state, action) => {
            state.error = action.error.name || action.error.message || action.error.code || ""
        })
    },
})
