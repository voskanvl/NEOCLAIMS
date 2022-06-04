import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { idText } from "typescript";

export type TUser = {
    token: string;
    role: {
        name: string;
        slug: string;
    };
    user_id: string;
    fullName: string;
    email: string;
    error?: string | object;
};
export type TError = { message: string; code: string };
export const login: AsyncThunk<any, { email: string; password: string }, {}> =
    createAsyncThunk("user/login", async (props, thunkAPI) => {
        const { email, password } = props;
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_SERVER}/auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    });
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
        builder.addCase(login.fulfilled, (state, action) => {
            console.log("🚀 ~ action", action);
            if ("message" in action.payload && "code" in action.payload) {
                state.user.error = action.payload;
            } else {
                state.user = action.payload;
                if (action.payload.token) {
                    //сохраняем токен и время получения
                    localStorage.setItem("token", action.payload.token);
                    localStorage.setItem("created", Date.now().toString());
                }
            }
        });
        builder.addCase(currentUser.fulfilled, (state, action) => {
            console.log("🚀 ~ action", action);
            if ("message" in action.payload && "code" in action.payload) {
                state.user.error = action.payload;
            } else {
                state.user = action.payload;
                if (action.payload.token) {
                    //сохраняем токен и время получения
                    localStorage.setItem("token", action.payload.token);
                    localStorage.setItem("created", Date.now().toString());
                }
            }
        });
    },
});
