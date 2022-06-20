import { PayloadAction } from "@reduxjs/toolkit";
import { loginSlice } from "../login";

export type StateType = ReturnType<typeof loginSlice.getInitialState>;

export type PayloadActionType =
    | PayloadAction<
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
      >
    | PayloadAction<
          any,
          string,
          {
              arg: string;
              requestId: string;
              requestStatus: "fulfilled";
          },
          never
      >;
export type ActionPayloadError = {
    type: string;
    payload?: any;
    error: {
        name?: string;
        message?: string;
        code?: string;
    };
};

export type CasesType = {
    whenFullFilled: (state: StateType, action: PayloadActionType) => void;
    whenError: (state: StateType, action: ActionPayloadError) => void;
};
