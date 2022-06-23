import { FC, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { claimsFetch, claimsPushFetch, page } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useIntersection } from "../../hooks/useIntersection"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

    const { page: pageStore, claimsPerPage, totalItems, loading } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { visible: down, setElement: setDown } = useIntersection(100)
    const { visible: up, setElement: setUp } = useIntersection(100)

    const [firstRender, setFirstRender] = useState(true)


    useEffect(() => {
        setFirstRender(false)
        if (!down || loading || firstRender) return
        if ((+pageStore + 1) <= ((totalItems / claimsPerPage) | 0)) {
            dispatch(page(pageStore + 1))
            dispatch(claimsFetch())
            !loading && navigate("/claims/" + (+pageStore + 1))
        }
    }, [down])

    useEffect(() => {
        if (!up || loading) return
        if ((+pageStore - 1) >= 0) {
            dispatch(page(pageStore - 1))
            dispatch(claimsFetch())
            !loading && navigate("/claims/" + (+pageStore - 1))
        }
    }, [up])

    return <div className="root" style={{ overflow: 'auto' }}>
        <div className="intersection__container">
            <div ref={setUp} className="intersetion__target" style={{ height: '10px' }}></div>
            {children}
            <div ref={setDown} className="intersetion__target" style={{ height: '10px' }}></div>
        </div>
    </div>
}