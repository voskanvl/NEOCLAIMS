import { memo } from "react"
import style from "./error500.module.sass"
export const Error500 = memo(() => <div className={style.error500__container}>
    <h1 className={style.error500__title}>500</h1>
    <p className={style.error500__text}>Server is not available</p>
    <p className={style.error500__text}>try reload this page or relogin</p>
</div>)