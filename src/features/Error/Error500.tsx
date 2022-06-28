import { FC, memo } from "react"
import style from "./Error500.module.sass"
export const Error500: FC<{ error: string }> =
    memo(function Error500({ error }) {
        return <div className={style.error500__container}>
            <h1 className={style.error500__title}>{error}</h1>
            <p className={style.error500__text}>Server is not available</p>
            <p className={style.error500__text}>try reload this page or relogin</p>
        </div>
    })