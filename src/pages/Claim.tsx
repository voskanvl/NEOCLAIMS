import { ChangeEvent, FC, SetStateAction, useCallback, useEffect, useState } from "react"
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
    useEffect(() => {
        setTitle(currentClaim.title)
        setTypeVal(currentClaim.type.name)
        setDescription(currentClaim.description)
    }, [currentClaim])
    const handler = useCallback((eventHandler: Function) => (ev: ChangeEvent<HTMLInputElement>) => eventHandler(ev.currentTarget.value), [])

    return <>
        <Input label={"title"} value={title} onChange={handler(setTitle)} />
        <Input label={"type"} value={typeVal} onChange={handler(setTypeVal)} />
        <select>
            {type.map(el => <option key={el.slug} value={el.name} defaultChecked={el.name === currentClaim.type.name}>{el.name}</option>)}
        </select>
        <Input label={"description"} value={description} onChange={handler(setDescription)} />
    </>
}