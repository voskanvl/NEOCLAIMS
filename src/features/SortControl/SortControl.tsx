import { FC, memo } from "react"
import style from "./sortControl.module.sass"

const SortUp: FC<{ matched: boolean | undefined }> = ({ matched }) => <svg viewBox="0 0 7 4" width="7" height="4" fill={matched ? "#000" : "#C2C2C2"}>
    <use xlinkHref="/icon-sprite.svg#sortup"></use>
</svg>
const SortDown: FC<{ matched: boolean | undefined }> = ({ matched }) => <svg viewBox="0 0 7 4" width="7" height="4" fill={matched ? "#000" : "#C2C2C2"}>
    <use xlinkHref="/icon-sprite.svg#sortdown"></use>
</svg>

export const SortControl: FC<{ sorted: 'asc' | 'desc' | undefined }> = ({ sorted }) => {
    return <div className={style.sort}>
        <SortUp matched={sorted === 'asc'} />
        <SortDown matched={sorted === 'desc'} />
    </div>
}
