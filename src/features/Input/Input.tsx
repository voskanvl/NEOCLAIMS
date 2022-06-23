import { ChangeEventHandler, FC, FormEventHandler, InputHTMLAttributes, memo } from "react"
import style from "./input.module.sass"

type TInput = InputHTMLAttributes<HTMLInputElement> & {
    svg?: JSX.Element,
    label: string,
    value?: string,
    errorName?: string,
    error?: boolean,
    onInput?: FormEventHandler<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    className?: string
}

export const Input: FC<TInput> = ({ svg, label, error, errorName, className, ...props }) => {
    return (
        <div className={`${style.input__wrapper} ${className}`} >
            <label className={style.input__label} >{label}</label>
            <div className={style.input__control} >
                <input {...props} />
                {svg}
            </div>
            <label className={error ? style.input__error_show : style.input__error}>{errorName}</label>
        </div>
    )
}