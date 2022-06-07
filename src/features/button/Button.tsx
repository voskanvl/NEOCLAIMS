import { FC, memo, MouseEventHandler } from "react"
import style from "./button.module.sass"
type TButton = {
    preload?: boolean,
    label: string,
    onClick?: MouseEventHandler<HTMLInputElement>
}
export const Button: FC<TButton> = memo(({ preload, label, onClick }) => {
    return <div className={style.submit}>
        <input className={`${style.submit__control} ${preload ? style.submit__preloading : ""}`} type="submit" value={label} onClick={onClick} />
    </div>
})