import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { claimsPushFetch } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
    const refTarget = useRef(null)

    const { claims, page } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()

    const [didDisappear, setDidDisappear] = useState(false)

    useEffect(() => {
        if (!didDisappear) return
        dispatch(claimsPushFetch({ page: +page + 1 }))
        console.log('refresh didDisappear')
    }, [didDisappear])

    const iso = useRef(new IntersectionObserver(([{ isIntersecting }]) => {
        console.log('target did disappear', didDisappear)
        setDidDisappear(s => {
            console.log('prev s', s)
            return isIntersecting
        })
    }
    ))


    if (refTarget.current && claims.length) iso.current.observe(refTarget.current)

    return <div className="intersetion__container">
        {children}
        <div ref={refTarget} className="intersetion__target" style={{ height: '10px' }}></div>
    </div>
}