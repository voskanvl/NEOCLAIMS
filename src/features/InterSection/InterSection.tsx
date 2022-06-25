import { FC, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { claimsFetch, claimsPushFetch, page } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useIntersection } from "../../hooks/useIntersection"
import style from "./intersection.module.sass"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

    const { page: pageStore, claimsPerPage, totalItems, loading } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { visible: down, setElement: setDown } = useIntersection(100)
    const { visible: up, setElement: setUp } = useIntersection(100)

    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
        let deltaPage = 0

        if (loading || !(+up ^ +down)) return //only in case different up & down

        if (down && (+pageStore + 1) <= ((totalItems / claimsPerPage) | 0)) deltaPage = 1
        if (up && (+pageStore - 1) >= 0) deltaPage = -1

        console.log("🚀 ~ deltaPage", deltaPage)

        dispatch(page(pageStore + deltaPage))
        dispatch(claimsFetch())
        !loading && navigate("/claims/" + (+pageStore + deltaPage))

    }, [up, down])

    return <div className={style.intersection__root}>
        <div className={style.intersection__container}>
            <div ref={setUp} className={style.intersetion__target} ></div>
            {children}
            <div ref={setDown} className={style.intersetion__target}></div>
        </div>
    </div>
}