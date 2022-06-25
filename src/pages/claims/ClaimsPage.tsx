import { ChangeEventHandler, FC, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { claimsFetch, page, search } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import style from "./claims.module.sass"
import ColorMap from "../../helpers/colorMap"
import { ClaimCard } from "../../features/ClaimCard/ClaimCard"
import { Input } from "../../features/Input/Input"
import { svg } from "../../features/svg/svg"
import ReactPaginate from "react-paginate"
import { Error500 } from "../../features/Error/Error500"
import { Layout } from "../../features/Layout/Layout"
import paginationStyle from "./pagination.module.sass"
import { CreateButton } from "../../features/CreateButton/CreateButton"
import { InterSection } from "../../features/InterSection/InterSection"
import { TableHeader } from "../../features/TableHeader/TableHeader"
import { useMediaMatch } from "../../hooks/useMediaMatch"
// import { JustCreated } from "../../features/JustCreated/JustCreated"


export const ClaimsPage: FC = () => {

    const errorLogin = useAppSelector(state => state.login.user.error)
    const errorClaims = useAppSelector(state => state.claims.error)

    const { _id } = useAppSelector(state => state.create.created)


    const { claimsPerPage, totalItems, claims: claimsFromServer } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [forcePage, setForcePage] = useState<number>(0)

    const { page: pageLocation } = useParams()

    const match = useMediaMatch(1024)

    useEffect(() => {
        console.log("dispatch(claimsFetch())")
        if (!isTokenCorrect(true)) return navigate("/login")
        dispatch(page(+pageLocation!))
        dispatch(claimsFetch())
        setForcePage(Number(pageLocation || 0))
    }, [pageLocation, dispatch, navigate])

    const handleInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
        dispatch(search(ev.target.value))
        dispatch(page(0))
        setForcePage(1)
        dispatch(claimsFetch())
    }

    return <Layout headerChildren={<Input label="" svg={svg.search} onChange={handleInput} />}>

        {errorLogin || errorClaims
            ? <Error500 error={errorLogin || errorClaims} />
            : <section className={style.claims__claims}>
                <div className={`${style.claims__line} ${style.claims__header}`}>
                    <h1 className={style.claims__title}>Your claims</h1>
                    <CreateButton />
                </div>
                <div className={style.claims__table}>
                    {
                        match
                            ? <InterSection>
                                {claimsFromServer?.map((el) => <ClaimCard claim={el} key={el._id} created={el._id === String(_id)} />)}
                            </InterSection>
                            : <>
                                <TableHeader />
                                {claimsFromServer?.map((el) =>
                                    <div key={el._id} className={style.claims__row}>
                                        <div>{el.title}</div>
                                        <div>{new Date(el.createdAt).toLocaleDateString('ru').replaceAll(".", "/")}</div>
                                        <div className={style.claims__type}>
                                            <span className={style.claims__mark} style={{ background: el.type?.name ? ColorMap.Type.byName[el.type?.name] : "" }}></span>
                                            <span>{el.type?.name || ""}</span>
                                        </div>
                                        <div className={style.claims__status} style={{ background: el.status?.name ? ColorMap.Status.byName[el.status.name] : "" }}>{el.status?.name || ""}</div>
                                        <div className={style.claims__link}><Link to={`/claim/${el._id}`}>Browse</Link></div>
                                    </div>)}
                                <div className={paginationStyle.pagination}>{
                                    forcePage < totalItems / claimsPerPage &&
                                    <ReactPaginate
                                        forcePage={forcePage}
                                        breakLabel="..."
                                        nextLabel=">"
                                        onPageChange={({ selected }) => navigate("/claims/" + selected)}
                                        pageRangeDisplayed={5}
                                        pageCount={Math.ceil(totalItems / claimsPerPage)}
                                        previousLabel="<"
                                    />}
                                </div>
                            </>
                    }

                </div>
            </section>}
    </Layout>
}

