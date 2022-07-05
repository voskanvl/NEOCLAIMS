import { ChangeEventHandler, FC, useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { claimsFetch, page, search } from "../../store/claims"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import style from "./Claims.module.sass"
import { ClaimCard } from "../../shared/ClaimCard/ClaimCard"
import { Input } from "../../shared/Input/Input"
import { Svg } from "../../shared/Svg/Svg"

import { Error500 } from "../../shared/Error/Error500"
import { Layout } from "../../shared/Layout/Layout"

import { CreateButton } from "../../shared/CreateButton/CreateButton"
import { InterSection } from "../../shared/InterSection/InterSection"
import { useMediaMatch } from "../../hooks/useMediaMatch"
import { clear } from "../../store/create"
import { TableClaims } from "../../shared/TableClaims/TableClaims"
import ReactPaginate from "react-paginate"
import paginationStyle from "./Pagination.module.sass"

export const ClaimsPage: FC = () => {

    const errorLogin = useAppSelector(state => state.login.user.error)
    const errorClaims = useAppSelector(state => state.claims.error)

    const { _id } = useAppSelector(state => state.create.created)

    const { claimsPerPage, totalItems, claims: claimsFromServer } =
        useAppSelector(state => state.claims)
    const { created } = useAppSelector(state => state.create)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [forcePage, setForcePage] = useState<number>(0)

    const { page: pageLocation } = useParams()

    const match = useMediaMatch(1024)

    const createdElement = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!created) return
        const lastPage = ((totalItems / claimsPerPage) | 0)
        dispatch(page(lastPage))
        setTimeout(() => {
            dispatch(clear())
        }, 3000)
        navigate(`/claims/${lastPage}`)
    }, [created])

    useEffect(() => {
        if (!isTokenCorrect(true)) return navigate("/login")
        dispatch(page(pageLocation ? +pageLocation : 0))
        dispatch(claimsFetch())
        setForcePage(Number(pageLocation || 0))
    }, [pageLocation, dispatch, navigate])

    const handleInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
        dispatch(search(ev.target.value))
        dispatch(page(0))
        setForcePage(1)
        dispatch(claimsFetch())
    }

    setTimeout(() => {
        if (createdElement.current) createdElement.current.scrollIntoView({ behavior: "smooth" })
    }, 200)

    const handlePageChange =
        useCallback(({ selected }: { selected: number }) =>
            navigate("/claims/" + selected), [navigate])

    return <Layout headerChildren={<Input label="" svg={<Svg.Search />} onChange={handleInput} />
    }>
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
                                {claimsFromServer?.map((el) => <ClaimCard
                                    claim={el}
                                    key={el._id}
                                    created={el._id === String(_id)}
                                    ref={el._id === String(_id)
                                        ? createdElement
                                        : null}
                                />)}
                            </InterSection>
                            : <><TableClaims claims={claimsFromServer} />
                                <div className={paginationStyle.pagination}>{
                                    forcePage < totalItems / claimsPerPage &&
                                    <ReactPaginate
                                        forcePage={forcePage}
                                        breakLabel="..."
                                        nextLabel=">"
                                        onPageChange={handlePageChange}
                                        pageRangeDisplayed={5}
                                        pageCount={Math.ceil(totalItems / claimsPerPage)}
                                        previousLabel="<"
                                    />}
                                </div></>
                    }
                </div>
            </section>}
    </Layout >
}

