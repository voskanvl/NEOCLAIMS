import { PayloadActionType, StateType } from "./types/loginTypes"

export const fullfilledHandler = (
    state: StateType,
    action: PayloadActionType,
) => {
    state.user = action.payload
    if (action.payload.token) {
        //сохраняем токен и время получения
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("created", Date.now().toString())
    }
}
