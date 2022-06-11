import { ChangeEvent, FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { claimsFetch, TFetchArgs } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import { shallowFlat } from "../helpers/shallowFlat"
import { TClaim, Claim } from "../types/type"
import style from "./claims.module.sass"
import ColorMap from "../helpers/colorMap"
import SortControl from "../features/sortControl/SortControl"
import ClaimCard from "../features/claimCard/claimCard"
import { Aside } from "../features/aside/Aside"
import Header from "../features/header/Header"
import { Input } from "../features/input/Input"
import { svg } from "../features/svg/svg"
import ReactPaginate from "react-paginate"
import { Error500 } from "../features/Error/Error500"
import { Layout } from "../features/layout/Layout"


export const Claims: FC = (props) => {
    const [claims, setClaims] = useState<Claim[]>()
    const [fetch, setFetch] = useState<TFetchArgs>({})
    const [didSort, setDidSort] = useState<{ attribute: keyof Claim, method: 'asc' | 'desc' }>()
    const error = useAppSelector(state => state.login.user.error)
    const { claimsPerPage } = useAppSelector(state => state.claims)
    const { totalItems, claims: claimsFromServer } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [forcePage, setForcePage] = useState<number>(0)

    useEffect(() => {
        if (!isTokenCorrect(true)) navigate("/")
    }, [dispatch, navigate])

    useEffect(() => {
        setClaims(claimsFromServer.map((e: TClaim) => shallowFlat(e, 'name') as Claim))
        didSort?.attribute && setClaims(state => sortMethod[didSort.method](state!, didSort.attribute))
    }, [claimsFromServer])

    useEffect(() => {
        dispatch(claimsFetch(fetch))
    }, [fetch, dispatch])

    const asc = (arr: any[], field: keyof Claim) => arr && [...arr].sort((a, b) => {
        if (a[field] > b[field]) { return 1 }
        if (a[field] < b[field]) { return -1 }
        return 0
    })
    const desc = (arr: any[], field: keyof Claim) => arr && [...arr].sort((a, b) => {
        if (a[field] < b[field]) { return 1 }
        if (a[field] > b[field]) { return -1 }
        return 0
    })

    const sortMethod = {
        asc, desc
    }

    const sort = (field: keyof Claim): void => {

        if (didSort?.attribute === field && didSort?.method === 'desc') {
            setClaims(asc(claims!, field))
            setDidSort({ attribute: field, method: 'asc' })
            return
        }
        if (didSort?.attribute === field && didSort?.method === 'asc') {
            setClaims(desc(claims!, field))
            setDidSort({ attribute: field, method: 'desc' })
            return
        }
        if (didSort?.attribute !== field) {
            setClaims(asc(claims!, field))
            setDidSort({ attribute: field, method: 'asc' })
            return
        }

    }

    const plus = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
        <use xlinkHref="/icon-sprite.svg#plus"></use>
    </svg>

    // const handle = ({ search,page }: TFetchArgs) => dispatch(claimsFetch())
    const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
        setForcePage(0)
        setFetch(state => ({ ...state, search: ev.target.value, page: 0 }))
    }
    return <Layout headerChildren={<Input label="" svg={svg.search} onChange={handleInput} />}>
        {error
            ? <div>{
                error === 'Failed to fetch' ? <Error500 /> : error
            }</div>
            : <section className={style.claims}>
                <div className={style.line}>
                    <h1 className={style.title}>Your claims</h1>
                    <button className={`${style.createButton}`} onClick={() => navigate('/create')}>
                        <span className={style.createButton__cross}>{plus}</span>
                        <span className={style.createButton__title}>Create claim</span>
                    </button></div>
                <div className={style.table}>
                    {matchMedia('(min-width: 769px)').matches && <div className={`${style.row} ${style.head}`}>

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
                    </div>}
                    {
                        matchMedia('(max-width: 1024px)').matches
                            ? claims?.map((el: Claim) => <ClaimCard claim={el} key={el._id} />)
                            : claims?.map((el: Claim) => <div key={el._id} className={style.row}>
                                <div>{el.title}</div>
                                <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                                <div className={style.type}>
                                    <span className={style.mark} style={{ background: ColorMap.Type.byName[el.type] }}></span>
                                    <span>{el.type}</span>
                                </div>
                                <div className={style.status} style={{ background: ColorMap.Status.byName[el.status] }}>{el.status}</div>
                                <div className={style.link}><Link to={`/claim/${el._id}`}>Browse</Link></div>
                            </div>)
                    }
                    <div className={style.pagination}>
                        <ReactPaginate
                            forcePage={forcePage}
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={({ selected }) => setFetch(state => ({ ...state, page: selected }))}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(totalItems / claimsPerPage)}
                            previousLabel="<"
                            renderOnZeroPageCount={(arg) => console.log('renderOnZeroPageCount', arg)}
                        />
                    </div>
                </div>
            </section>}
    </Layout>






    // <div className={style.layout}>
    //     <Aside />
    //     <main className={style.main}>
    //         <Header>
    //             <Input label="" svg={svg.search} onChange={handleInput} />
    //         </Header>

    //     </main>
    // </div>

}