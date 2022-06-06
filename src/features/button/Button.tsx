import { FC, memo, MouseEventHandler } from "react"
import style from "./button.module.sass"
type TButton = {
    label: string,
    onClick?: MouseEventHandler<HTMLInputElement>
}
export const Button: FC<TButton> = memo(({ label, onClick }) => {
    return <div className={style.submit}>
        <input className={style.submit__control} type="submit" value={label} onClick={onClick} />
    </div>
})