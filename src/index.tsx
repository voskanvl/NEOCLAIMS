import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import reportWebVitals from "./reportWebVitals"
import "./index.module.sass"
import { RoutesApp } from "./RoutesApp"


const container = document.getElementById("root")!
const root = createRoot(container)



root.render(
    <StrictMode>
        <Provider store={store}>
            <RoutesApp />
        </Provider>
    </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

