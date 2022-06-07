import { FC, memo, MouseEventHandler } from "react"
import style from "./button.module.sass"
type TButton = {
    preload?: boolean,
    error?: boolean,
    errorMessage?: string,
    label: string,
    onClick?: MouseEventHandler<HTMLInputElement>
}
export const Button: FC<TButton> = memo(({ preload, error, errorMessage, label, onClick }) => {
    return <div className={style.submit}>
        <input className={`${style.submit__control} ${preload ? style.submit__preloading : ""} ${error ? style.submit__error : ""}`} type="submit" value={errorMessage ? errorMessage : label} onClick={onClick} />
    </div>
})