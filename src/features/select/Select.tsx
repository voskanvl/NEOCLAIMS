import { ChangeEventHandler, FC, FormEventHandler, memo } from "react"
import style from "./select.module.sass"
import colorMap from "../../helpers/colorMap"
import { useParams } from "react-router-dom"

type TSelect = {
    label: string,
    options?: string[],
    selected?: string,
    onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const Select: FC<TSelect> = memo(({ label, options, selected, ...props }) => {
    const { claimId } = useParams()
    console.log("🚀 ~ claimId", claimId)

    return (
        <div className={style.select__wrapper} >
            <label className={style.select__label} >{label}</label>
            <div className={style.select__control} >
                {claimId && <div className={style.mark} style={{ background: colorMap.Type.byName[selected!] }}></div>}
                <select {...props} className={claimId ? "" : style.shift}>
                    {options && options.map(el => <option key={el} value={el} selected={el === selected}>{el}</option>)}
                </select>
            </div>
        </div>
    )
})