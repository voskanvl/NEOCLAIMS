import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit"
import { fullfilledHandler } from "./fullfilledHandler"
import { loginFetch } from "./loginThunks/loginFetch"
import { regFetch } from "./loginThunks/regFetch"
import { currentUser } from "./loginThunks/currentUser"
import { ActionPayloadError, CasesType, StateType } from "./types/loginTypes"

const inCaseError = (state: StateType, action: ActionPayloadError) => {
    state.user.error = JSON.parse(action.payload.message).message
}

const cases: CasesType = {
    fulfilled: fullfilledHandler,
    rejected: inCaseError,
}

const initialState = {
    user: {
        token: "",
        role: {
            name: "",
            slug: "",
        },
        user_id: "",
        fullName: "",
        email: "",
        error: "",
    },
}

export const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: builder => {
        asyncThunkCase(builder)(regFetch, cases)
        asyncThunkCase(builder)(loginFetch, cases)
        asyncThunkCase(builder)(currentUser, cases)
    },
})

const asyncThunkCase =
    (builder: ActionReducerMapBuilder<any>) =>
    (thunk: any, cases: CasesType) => {
        builder.addCase(thunk.fulfilled, cases.fulfilled)
        builder.addCase(thunk.rejected, cases.rejected)
    }

export const { reset } = loginSlice.actions
