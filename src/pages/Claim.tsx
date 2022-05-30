import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { currentClaimFetch } from "../app/claim"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Input } from "../features/input/Input"
import { isTokenCorrect } from "../helpers/isTokenCorrect"

export const Claim: FC = (props) => {
    const { claimId } = useParams()
    const { currentClaim } = useAppSelector(state => state.currentClaim)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isTokenCorrect() && claimId) dispatch(currentClaimFetch(claimId))
    }, [dispatch])

    return <>
        <Input label={"title"} value={currentClaim.title} />
        <Input label={"type"} value={currentClaim.type.name} />
        <Input label={"description"} value={currentClaim.description} />
    </>
}