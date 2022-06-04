import { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { claimsFetch } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import { shallowFlat } from "../helpers/shallowFlat"
import { TClaim, Claim } from "../types/type"
import style from "./claims.module.sass"
import ColorMap from "../helpers/colorMap"
import SortControl from "../features/sortControl/SortControl"
import ClaimCard from "../features/claimCard/claimCard"


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
        <div className={style.line}><h1 className={style.title}>Your claims</h1><button className={`${style.createButton}`} onClick={() => navigate('/create')}><span>{plus}</span><span>Create claim</span></button></div>
        <div className={style.table}>
            <div className={`${style.row} ${style.head}`}>

                <button className={style.table__button} onClick={() => sort('title')}>
                    <span className={style.table__buttonName}>Title</span><SortControl sorted={didSort?.attribute === 'title' ? didSort.method : undefined} />
                </button>
                <button className={style.table__button} onClick={() => sort('createdAt')}>
                    <span className={style.table__buttonName}>Created</span><SortControl sorted={didSort?.attribute === 'createdAt' ? didSort.method : undefined} />
                </button>
                <button className={style.table__button} onClick={() => sort('type')}>
                    <span className={style.table__buttonName}>Type</span><SortControl sorted={didSort?.attribute === 'type' ? didSort.method : undefined} />
                </button>
                <button className={style.table__button} onClick={() => sort('status')}>
                    <span className={style.table__buttonName}>Status</span><SortControl sorted={didSort?.attribute === 'status' ? didSort.method : undefined} />

                </button>
                <button className={style.table__button}>Action</button>
            </div>
            {
                (claims && claims.length) && claims.map((el: Claim) => matchMedia('(max-width: 768px)').matches
                    ? <ClaimCard claim={el} key={el._id} />
                    : <div key={el._id} className={style.row}>
                        <div>{el.title}</div>
                        <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                        <div className={style.type}>
                            <span className={style.mark} style={{ background: ColorMap.Type.byName[el.type] }}></span>
                            <span>{el.type}</span>
                        </div>
                        <div className={style.status} style={{ background: ColorMap.Status.byName[el.status] }}>{el.status}</div>
                        <div><Link to={`/claim/${el._id}`}>Browse</Link></div>
                    </div>)
            }
        </div>


    </>
}