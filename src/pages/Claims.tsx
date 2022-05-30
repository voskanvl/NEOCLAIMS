import { FC, useEffect } from "react"
import { Link } from "react-router-dom"
import { claimsFetch } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { TClaim } from "../types/type"
import style from "./claims.module.sass"

export const Claims: FC = (props) => {
    const claims = useAppSelector(state => state.claims.claims)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(claimsFetch())
    }, [])
    return <>
        <div className={style.table}>
            <div className={`${style.row} ${style.head}`}>
                <div className={`${style.table__button} ${style.table__button_title}`}>Title</div>
                <div className={`${style.table__button} ${style.table__button_createAt}`}>Created</div>
                <div className={`${style.table__button} ${style.table__button_type}`}>Type</div>
                <div className={`${style.table__button} ${style.table__button_status}`}>Status</div>
                <div className={`${style.table__button} ${style.table__button_actioins}`}>Action</div>
            </div>
            {claims.map((el: TClaim) => <div key={el._id} className={style.row}>
                <div>{el.title}</div>
                <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                <div>{el.type.name}</div>
                <div>{el.status.name}</div>
                <div><Link to={`/claim/${el._id}`}>Browse</Link></div>
            </div>)}
        </div>


    </>
}