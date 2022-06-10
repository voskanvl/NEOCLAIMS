import { ChangeEventHandler, FC, FormEventHandler, memo } from "react"
import style from "./input.module.sass"

type TInput = JSX.IntrinsicElements["input"] & {
    svg?: JSX.Element,
    label: string,
    value?: string,
    onInput?: FormEventHandler<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Input: FC<TInput> = ({ svg, label, ...props }) => {
    return (
        <div className={style.input__wrapper} >
            <label className={style.input__label} >{label}</label>
            <div className={style.input__control} >
                <input {...props} />
                {svg}
            </div>
        </div>
    )
}