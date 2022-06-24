import { ChangeEventHandler, FC, FormEventHandler, InputHTMLAttributes, memo, useState } from "react"
import style from "./input.module.sass"

type TInput = InputHTMLAttributes<HTMLInputElement> & {
    svg?: JSX.Element,
    label: string,
    value?: string,
    errorName?: string,
    error?: boolean,
    onInput?: FormEventHandler<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    className?: string,
    type?: string
}



export const Input: FC<TInput> = ({ svg, label, error, errorName, className, type, ...props }) => {
    const [typeState, setType] = useState(type)
    const [prevTypeState, setPrevTypeState] = useState("")
    const handleSvgTap = (val: "down" | "up") => {
        console.log("TAP")
        if (val === "down" && type === "password") {
            setPrevTypeState("password")
            setType("text")
        }
        if (val === "up" && prevTypeState === "password") {
            setType("password")
            setPrevTypeState("")
        }
    }

    return (
        <div className={`${style.input__wrapper} ${className}`} >
            <label className={style.input__label} >{label}</label>
            <div className={style.input__control} >
                <input type={typeState} {...props} />
                <div className={style.input__svg} onMouseDown={() => handleSvgTap("down")} onMouseUp={() => handleSvgTap("up")}>
                    {svg}
                </div>
            </div>
            <label className={error ? style.input__error_show : style.input__error}>{errorName}</label>
        </div>
    )
}