import { FC, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { claimsPushFetch, page } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useIntersection } from "../../hooks/useIntersection"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

    const { page: pageStore, claimsPerPage, totalItems } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { visible, setElement } = useIntersection()


    useEffect(() => {
        if (!visible) return
        dispatch(page(pageStore + 1))
        dispatch(claimsPushFetch())
        if ((+pageStore + 1) <= ((totalItems / claimsPerPage) | 0)) {
            setTimeout(() => { navigate("/claims/" + (+pageStore + 1)) }, 200)
        }
    }, [visible])

    return <div className="root" style={{ overflow: 'auto' }}>
        <div className="intersection__container">
            {children}
            <div ref={setElement} className="intersetion__target" style={{ height: '10px' }}></div>
        </div>
    </div>
}