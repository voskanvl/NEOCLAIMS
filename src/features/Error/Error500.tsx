import { memo } from "react"
import style from "./error500.module.sass"
export const Error500 = memo(() => <div className={style.container}>
    <h1>500</h1>
    <p>Server is not available</p>
    <p>try reload this page or relogin</p>
</div>)