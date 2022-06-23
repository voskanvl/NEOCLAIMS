import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit"
import { fullfilledHandler } from "./fullfilledHandler"
import { loginFetch } from "./loginThunks/loginFetch"
import { regFetch } from "./loginThunks/regFetch"
import { currentUser } from "./loginThunks/currentUser"
import { ActionPayloadError, CasesType, StateType } from "./types/loginTypes"

const inCaseError = (state: StateType, action: ActionPayloadError) => {
    console.log('action.payload', action.payload)
    console.log('action.error', action.error)
    // state.user.error =
    //     action.error.code || action.error.message || action.error.name || ""
    state.user.error = JSON.parse(action.payload.message).message
}

const cases: CasesType = {
    whenFullFilled: fullfilledHandler,
    whenError: inCaseError,
}

export const loginSlice = createSlice({
    name: "user",
    initialState: {
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
    },
    reducers: {},
    extraReducers: builder => {
        asyncThunkCase(builder)(regFetch, cases)
        asyncThunkCase(builder)(loginFetch, cases)
        asyncThunkCase(builder)(currentUser, cases)
    },
})

const asyncThunkCase =
    (builder: ActionReducerMapBuilder<any>) =>
        (thunk: any, cases: CasesType) => {
            builder.addCase(thunk.fulfilled, cases.whenFullFilled)
            builder.addCase(thunk.rejected, cases.whenError)
        }
