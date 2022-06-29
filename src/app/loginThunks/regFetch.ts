import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import { request } from "../request"

export type TReg = { email: string; password: string; fullName: string }

export const regFetch: AsyncThunk<any, TReg, Record<string, unknown>> = createAsyncThunk(
    "user/reg",
    async ({ email, password, fullName }, { rejectWithValue }) => {
        try {
            return await request("registration", { email, password, fullName })
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)
