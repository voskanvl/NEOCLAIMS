import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const typeFetch = createAsyncThunk("type/fetch", async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/types`,
            {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                mode: "cors",
            },
        )
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
})
export const typeSlice = createSlice({
    name: "type",
    initialState: {
        type: [] as { name: string; slug: string }[],
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(typeFetch.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                state.error = action.payload.name
            } else {
                state.type = action.payload
            }
        })
    },
})
