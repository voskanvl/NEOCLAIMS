import { FC, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { claimsFetch } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import { TClaim } from "../types/type"
import style from "./claims.module.sass"

export const Claims: FC = (props) => {
    let claims = useAppSelector(state => state.claims.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isTokenCorrect(true)) {
            dispatch(claimsFetch())
        } else {
            navigate("/")
        }
    }, [dispatch, navigate])
    const sort = (field: keyof TClaim): void => {
        claims = [...claims].sort((a, b) => {
            if (a[field] > b[field]) { return 1 }
            if (a[field] < b[field]) { return -1 }
            return 0
        })
    }
    return <>
        <div className={style.table}>
            <div className={`${style.row} ${style.head}`}>
                <button className={`${style.table__button} ${style.table__button_title}`} onClick={() => sort('title')}>Title</button>
                <button className={`${style.table__button} ${style.table__button_createAt}`} onClick={() => sort('createdAt')}>Created</button>
                <button className={`${style.table__button} ${style.table__button_type}`} onClick={() => sort('type')}>Type</button>
                <button className={`${style.table__button} ${style.table__button_status}`} onClick={() => sort('status')}>Status</button>
                <button className={`${style.table__button} ${style.table__button_actioins}`} >Action</button>
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