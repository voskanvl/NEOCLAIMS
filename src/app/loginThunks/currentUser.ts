import { createAsyncThunk } from "@reduxjs/toolkit";

export const currentUser = createAsyncThunk("user/user", async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_SERVER}/user/${id}`,
            {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                mode: "cors",
            },
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
});
