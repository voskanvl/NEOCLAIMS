import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { claimsFetch, page, search, TFetchArgs } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import { shallowFlat } from "../../helpers/shallowFlat"
import { TClaim, Claim } from "../../types/type"
import style from "./claims.module.sass"
import ColorMap from "../../helpers/colorMap"
import SortControl from "../../features/sortControl/SortControl"
import ClaimCard from "../../features/claimCard/claimCard"
import { Input } from "../../features/input/Input"
import { svg } from "../../features/svg/svg"
import ReactPaginate from "react-paginate"
import { Error500 } from "../../features/Error/Error500"
import { Layout } from "../../features/layout/Layout"
import paginationStyle from "../styles/pagination.module.sass"
import { CreateButton } from "../../features/createButton/CreateButton"
import { InterSection } from "../../features/interSection/InterSection"
import { TableHeader } from "../../features/tableHeader/TableHeader"


export const Claims: FC = () => {
    // const [claims, setClaims] = useState<Claim[]>()
    // const [fetch, setFetch] = useState<TFetchArgs>({})
    // const [didSort, setDidSort] = useState<{ attribute: keyof Claim, method: 'asc' | 'desc' }>()

    const error = useAppSelector(state => state.login.user.error)
    const { claimsPerPage, totalItems, claims: claimsFromServer } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const location = useLocation()

    const [forcePage, setForcePage] = useState<number>(0)

    const { page: pageLocation } = useParams()

    useEffect(() => {
        dispatch(page(+pageLocation!))
        dispatch(claimsFetch())
    }, [pageLocation])

    const handleInput: ChangeEventHandler<HTMLInputElement> = (ev) => dispatch(search(ev.target.value))

    return <Layout headerChildren={<Input label="" svg={svg.search} onChange={handleInput} />}>

        {error
            ? <div>{
                error === 'Failed to fetch' ? <Error500 /> : error
            }</div>
            : <section className={style.claims}>
                <div className={style.line}>
                    <h1 className={style.title}>Your claims</h1>
                    <CreateButton /></div>
                <div className={style.table}>
                    {
                        matchMedia('(max-width: 1024px)').matches
                            ? <InterSection>{claimsFromServer?.map((el) => <ClaimCard claim={el} key={el._id} />)}</InterSection>
                            : <>
                                <TableHeader />
                                {claimsFromServer?.map((el) =>
                                    <div key={el._id} className={style.row}>
                                        <div>{el.title}</div>
                                        <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                                        <div className={style.type}>
                                            <span className={style.mark} style={{ background: el.type?.name ? ColorMap.Type.byName[el.type?.name] : "" }}></span>
                                            <span>{el.type?.name || ""}</span>
                                        </div>
                                        <div className={style.status} style={{ background: el.status?.name ? ColorMap.Status.byName[el.status.name] : "" }}>{el.status?.name || ""}</div>
                                        <div className={style.link}><Link to={`/claim/${el._id}`}>Browse</Link></div>
                                    </div>)}
                            </>
                    }
                    <div className={paginationStyle.pagination}>
                        <ReactPaginate
                            forcePage={forcePage + 1}
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={({ selected }) => navigate("/claims/" + selected)}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(totalItems / claimsPerPage)}
                            previousLabel="<"
                            renderOnZeroPageCount={(arg) => console.log('renderOnZeroPageCount', arg)}
                        />
                    </div>
                </div>
            </section>}
    </Layout>
}