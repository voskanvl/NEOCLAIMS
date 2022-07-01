import { memo } from "react"
import { useNavigate } from "react-router-dom"
import style from "./СreateButton.module.sass"
import { svg } from "../svg/svg"

export const CreateButton = memo(function CreateButton() {
    const navigate = useNavigate()
    return <button className={`${style.createButton}`} onClick={() => navigate("/create")}>
        <span className={style.createButton__cross}>{svg.plus}</span>
        <span className={style.createButton__title}>Create claim</span>
    </button>
})