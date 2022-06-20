import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

export const fullfilledHandler = (
    state: WritableDraft<{
        user: {
            token: string;
            role: {
                name: string;
                slug: string;
            };
            user_id: string;
            fullName: string;
            email: string;
            error: string;
        };
    }>,
    action: PayloadAction<
        any,
        string,
        {
            arg: {
                email: string;
                password: string;
            };
            requestId: string;
            requestStatus: "fulfilled";
        },
        never
    >,
) => {
    state.user = action.payload;
    if (action.payload.token) {
        //сохраняем токен и время получения
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("created", Date.now().toString());
    }
};
