import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { currentClaimFetch } from "../app/claim"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { typeFetch } from "../app/type"
import { Input } from "../features/input/Input"
import { isTokenCorrect } from "../helpers/isTokenCorrect"

export const Claim: FC = (props) => {
    const [title, setTitle] = useState('')
    const [typeVal, setTypeVal] = useState('')
    const [description, setDescription] = useState('')
    const { claimId } = useParams()
    const { currentClaim } = useAppSelector(state => state.currentClaim)
    const { type } = useAppSelector(state => state.type)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isTokenCorrect(true) && claimId) dispatch(currentClaimFetch(claimId))
        if (isTokenCorrect(true) && claimId) dispatch(typeFetch())
    }, [dispatch])

    return <>
        <Input label={"title"} value={currentClaim.title} onChange={ev => setTitle(ev.currentTarget.value)} />
        <Input label={"type"} value={currentClaim.type.name} onChange={ev => setTypeVal(ev.currentTarget.value)} />
        <select>
            {type.map(el => <option key={el.slug} value={el.name} defaultChecked={el.name === currentClaim.type.name}>{el.name}</option>)}
        </select>
        <Input label={"description"} value={currentClaim.description} onChange={ev => setDescription(ev.currentTarget.value)} />
    </>
}