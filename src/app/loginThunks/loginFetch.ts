import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import { request } from "../request"

export const loginFetch: AsyncThunk<
    any,
    { email: string; password: string },
    {}
> = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            return await request("login", { email, password })
        } catch (error) {
            const { message } = error as { message: string }
            return rejectWithValue({ message })
        }
    },
)
