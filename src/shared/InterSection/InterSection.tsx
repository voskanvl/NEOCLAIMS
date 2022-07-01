import { FC, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { claimsFetch, page } from "../../app/claims"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { useIntersection } from "../../hooks/useIntersection"
import style from "./Intersection.module.sass"

export const InterSection: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

    const {
        page: pageStore,
        claimsPerPage,
        totalItems,
        loading } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { visible: down, setElement: setDown } = useIntersection(100)
    const { visible: up, setElement: setUp } = useIntersection(100)

    useEffect(() => {
        let deltaPage = 0

        if (loading || !(+up ^ +down)) return //only in case different up & down

        if (down && (+pageStore + 1) <= ((totalItems / claimsPerPage) | 0)) deltaPage = 1
        if (up && (+pageStore - 1) >= 0) deltaPage = -1

        dispatch(page(pageStore + deltaPage))
        dispatch(claimsFetch())
        !loading && navigate("/claims/" + (+pageStore + deltaPage), { replace: false })

    }, [up, down])

    return <div className={style.intersection__root}>
        <div className={style.intersection__container}>
            <div ref={setUp} className={style.intersection__target} ></div>
            <div className={style.intersection__wrapper}>
                {children}
            </div>
            <div ref={setDown} className={style.intersection__target}></div>
        </div>
    </div>
}