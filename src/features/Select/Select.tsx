import { ChangeEventHandler, FC, memo } from "react"
import style from "./select.module.sass"
import colorMap from "../../helpers/colorMap"
import { useParams } from "react-router-dom"

type TSelect = {
    label: string,
    options?: string[],
    defaultValue?: string,
    onChange?: ChangeEventHandler<HTMLSelectElement>,
    className?: string
}

export const Select: FC<TSelect> = memo(({ label, options, defaultValue, className, ...props }) => {

    return (
        <div className={`${style.select__wrapper} ${className}`} >
            <label className={style.select__label} >{label}</label>
            <div className={style.select__control} >
                <div className={style.mark} style={{ background: colorMap.Type.byName[defaultValue!] }}></div>
                <select {...props} className={style.select__shift} defaultValue={defaultValue}>
                    {options && options.map(el => <option key={el} value={el} >{el}</option>)}
                </select>
            </div>
        </div>
    )
})