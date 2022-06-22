import { createSlice } from "@reduxjs/toolkit"

export const showAside = createSlice({
    name: "aside",
    initialState: {
        show: false,
    },
    reducers: {
        toggle: state => {
            state.show = !state.show
        },
        show: state => {
            state.show = true
        },
        hidden: state => {
            state.show = false
        },
    },
})

export const { toggle, show, hidden } = showAside.actions
