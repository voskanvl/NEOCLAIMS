import { FC, InputHTMLAttributes, MouseEventHandler } from "react"
import style from "./button.module.sass"
interface IButton extends InputHTMLAttributes<HTMLInputElement> {
    preload?: boolean,
    error?: boolean,
    errorMessage?: string,
    label: string,
    onClick?: MouseEventHandler<HTMLInputElement>
}
export const Button: FC<IButton> = ({ preload, error, errorMessage, label, ...props }) => {
    return <div className={style.submit}>
        <input
            className={`
                ${style.submit__control} 
                ${preload ? style.submit__preloading : ""} 
                ${error ? style.submit__error : ""}
            `}
            type="submit"
            value={errorMessage ? errorMessage : label}
            onClick={props.onClick}
            {...props}
        />
    </div>
}