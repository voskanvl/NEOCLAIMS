import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { claimsPushFetch, page } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
    const refTarget = useRef(null)
    const refRoot = useRef(null)

    const { claims, page: pageStore } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [didDisappear, setDidDisappear] = useState(false)

    useEffect(() => {
        if (!didDisappear) return
        dispatch(page(pageStore + 1))
        dispatch(claimsPushFetch())
        setTimeout(() => { navigate("/claims/" + (+pageStore + 1)) }, 200)
    }, [didDisappear])

    const iso = useRef(new IntersectionObserver(([{ isIntersecting }]) => {
        setDidDisappear(isIntersecting)
    }, { root: refRoot.current }
    ))


    if (refTarget.current && claims.length) iso.current.observe(refTarget.current)

    return <div ref={refRoot} className="root" style={{ overflow: 'auto' }}>
        <div className="intersection__container">
            {children}
            <div ref={refTarget} className="intersetion__target" style={{ height: '10px' }}></div>
        </div>
    </div>
}