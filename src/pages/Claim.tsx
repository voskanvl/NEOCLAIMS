import { ChangeEvent, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { changeClaimFetch, currentClaimFetch } from "../app/claim"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { statusFetch } from "../app/status"
import { typeFetch } from "../app/type"
import { Aside } from "../features/aside/Aside"
import Header from "../features/header/Header"
import { Input } from "../features/input/Input"
import { Layout } from "../features/layout/Layout"
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
    const { status } = useAppSelector(state => state.status)
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

    useEffect(() => {
        if (!status.length) dispatch(statusFetch())
    }, [status])

    // useEffect(() => {
    //     if (role.slug === "admin" && currentClaim.status.slug === 'new') changeStatus('in-progress', false)
    //     console.log('change status in-progress')
    // }, [])

    const handler = useCallback((eventHandler: Function) => (ev: ChangeEvent<HTMLInputElement>) => eventHandler(ev.currentTarget.value), [])

    const changeStatus = (newStatus: string, done = true) => () => {
        const selectedStatus = status.find(e => e.name === newStatus || e.slug === newStatus)
        if (selectedStatus) {
            dispatch(changeClaimFetch({ ...currentClaim, status: selectedStatus }))
            if (done) navigate(-1)
        }
    }

    return <Layout>
        <div className={style.block}>
            <h1>Incoming claim</h1>
            <Input label={"title"} value={title} onChange={handler(setTitle)} />
            <Select label={'type'} options={type.map(e => e.name)} defaultValue={typeVal} />
            <Input label={"description"} value={description} onChange={handler(setDescription)} />
            <div className={style.create__controls}>
                <button className={style.create__cancel} onClick={changeStatus('in-progress')}>Cancel</button>
                <button className={style.create__create} disabled={role.slug === 'work'} onClick={changeStatus('done')}>Done</button>
                <button className={style.create__decline} disabled={(role.slug === 'work')} onClick={changeStatus('decl')}>Decline</button>
            </div>
        </div>
    </Layout>
}