import { ChangeEvent, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { currentClaimFetch } from "../app/claim"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { typeFetch } from "../app/type"
import { Aside } from "../features/aside/Aside"
import Header from "../features/header/Header"
import { Input } from "../features/input/Input"
import { Select } from "../features/select/Select"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import style from "./claims.module.sass"

export const Claim: FC = (props) => {
    const [title, setTitle] = useState('')
    const [typeVal, setTypeVal] = useState('')
    const [description, setDescription] = useState('')
    const { claimId } = useParams()
    const { currentClaim } = useAppSelector(state => state.currentClaim)
    const { type } = useAppSelector(state => state.type)
    const { role } = useAppSelector(state => state.login.user)
    console.log("🚀 ~ role", role)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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

    return <div className={style.layout}>
        <Aside />
        <main className={style.main}>
            <Header />
            <div className={style.block}>
                <h1>Incoming claim</h1>
                <Input label={"title"} value={title} onChange={handler(setTitle)} />
                <Select label={'type'} options={type.map(e => e.name)} selected={currentClaim.type.name} />
                <Input label={"description"} value={description} onChange={handler(setDescription)} />
                <div className={style.create__controls}>
                    <button className={style.create__cancel} disabled={(role.slug === 'work')} onClick={() => navigate(-1)}>Cancel</button>
                    <button className={style.create__create} disabled={role.slug === 'work'} >Done</button>
                    <button className={style.create__decline} disabled={(role.slug === 'work')} >Decline</button>
                </div>
            </div>
        </main >
    </div >
}