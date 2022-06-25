import { ChangeEvent, ChangeEventHandler, FC, memo, useState } from "react"
import style from "./select.module.sass"
import colorMap from "../../helpers/colorMap"

type TSelect = {
    label: string,
    options?: string[],
    defaultValue?: string,
    onChange?: ChangeEventHandler<HTMLSelectElement>,
    className?: string
}

export const Select: FC<TSelect> = ({ label, options, defaultValue, className, onChange, ...props }) => {
    const [color, setColor] = useState("")

    const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        const result = colorMap.Type.byName[ev.target.value]
        setColor(result)
        if (onChange) onChange(ev)
    }

    return (
        <div className={`${style.select__wrapper} ${className}`} >
            <label className={style.select__label} >{label}</label>
            <div className={style.select__control} >
                <div
                    className={style.mark}
                    style={{ background: color }}>
                </div>
                <select  {...props} className={style.select__shift} defaultValue={defaultValue} onChange={handleChange}>
                    {options && options.map(el => <option key={el} value={el} >{el}</option>)}
                </select>
            </div>
        </div>
    )
}