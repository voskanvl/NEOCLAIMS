import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TClaim } from "../types/types"
import { createFetchOption } from "./createFetchOption"

type TCreate = {
    title: string
    description: string
    type: string
    status: string
}

export const createFetch = createAsyncThunk(
    "create/fetch",
    async (body: TCreate, { rejectWithValue }) => {
        try {
            const option = createFetchOption()
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/claim`,
                {
                    ...option,
                    method: "POST",
                    body: JSON.stringify(body),
                },
            )
            const result = await response.json()
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

const initialState = {
    created: {} as TClaim,
    error: "",
    pending: false,
}

export const createClaimSlice = createSlice({
    name: "create",
    initialState,
    reducers: {
        clear: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(createFetch.fulfilled, (state, action) => {
            state.pending = false
            state.created = action.payload
        })
        builder.addCase(createFetch.rejected, (state, action) => {
            state.pending = false
            state.error = String(action.payload)
        })
        builder.addCase(createFetch.pending, (state, action) => {
            state.pending = true
        })
    },
})

export const { clear } = createClaimSlice.actions
