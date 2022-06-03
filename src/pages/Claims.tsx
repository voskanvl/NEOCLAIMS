import { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { claimsFetch } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import { shallowFlat } from "../helpers/shallowFlat"
import { TClaim } from "../types/type"
import style from "./claims.module.sass"
import ColorMap from "../helpers/colorMap"

type Claim = TClaim & { type: string, status: string }
export const Claims: FC = (props) => {
    const [claims, setClaims] = useState<Claim[]>()
    const [didSort, setDidSort] = useState<{ attribute: keyof Claim, method: 'asc' | 'desc' }>()
    const claimsFromServer = useAppSelector(state => state.claims.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isTokenCorrect(true)) {
            dispatch(claimsFetch())
        } else {
            navigate("/")
        }
    }, [dispatch, navigate])
    useEffect(() => {
        return setClaims(claimsFromServer.map((e: TClaim) => shallowFlat(e, 'name') as Claim))
    }, [claimsFromServer])
    const sort = (field: keyof Claim): void => {
        const asc = (field: keyof Claim) => claims && [...claims].sort((a, b) => {
            if (a[field] > b[field]) { return 1 }
            if (a[field] < b[field]) { return -1 }
            return 0
        })
        const desc = (field: keyof Claim) => claims && [...claims].sort((a, b) => {
            if (a[field] < b[field]) { return 1 }
            if (a[field] > b[field]) { return -1 }
            return 0
        })
        if (didSort?.attribute === field && didSort?.method === 'desc') {
            setClaims(asc(field))
            setDidSort({ attribute: field, method: 'asc' })
            return
        }
        if (didSort?.attribute === field && didSort?.method === 'asc') {
            setClaims(desc(field))
            setDidSort({ attribute: field, method: 'desc' })
            return
        }
        if (didSort?.attribute !== field) {
            setClaims(asc(field))
            setDidSort({ attribute: field, method: 'asc' })
            return
        }

    }
    const plus = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#plus"></use>
    </svg>
    return <>
        <button className={`${style.createButton}`} onClick={() => navigate('/create')}><span>{plus}</span><span>Create claim</span></button>
        <div className={style.table}>
            <div className={`${style.row} ${style.head}`}>
                <button className={`${style.table__button} ${style.table__button_title}`} onClick={() => sort('title')}>Title</button>
                <button className={`${style.table__button} ${style.table__button_createAt}`} onClick={() => sort('createdAt')}>Created</button>
                <button className={`${style.table__button} ${style.table__button_type}`} onClick={() => sort('type')}>Type</button>
                <button className={`${style.table__button} ${style.table__button_status}`} onClick={() => sort('status')}>Status</button>
                <button className={`${style.table__button} ${style.table__button_actions}`} >Action</button>
            </div>
            {(claims && claims.length) && claims.map((el: Claim) => <div key={el._id} className={style.row}>
                <div>{el.title}</div>
                <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                <div>{el.type}</div>
                <div className={style.status} style={{ background: ColorMap.Status.byName[el.status] }}>{el.status}</div>
                <div><Link to={`/claim/${el._id}`}>Browse</Link></div>
            </div>)}
        </div>


    </>
}