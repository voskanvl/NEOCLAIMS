import { createSlice } from "@reduxjs/toolkit";

export const showAside = createSlice({
    name: "aside",
    initialState: {
        show: false,
    },
    reducers: {
        show: state => {
            state.show = !state.show;
        },
    },
});

export const { show } = showAside.actions;
