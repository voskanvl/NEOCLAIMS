import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createFetch } from "../../app/create"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { typeFetch } from "../../app/type"
import { Input } from "../../features/Input/Input"
import { Layout } from "../../features/layout/Layout"
import { Select } from "../../features/Select/Select"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import style from "./create.module.sass"

export const CreatePage: FC = (props) => {
    const { type } = useAppSelector(state => state.type)
    const { error, pending } = useAppSelector(state => state.create)
    const { totalItems, claimsPerPage } = useAppSelector(state => state.claims)

    const [created, setCreated] = useState(false)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [typeVal, setTypeVal] = useState('')
    const [description, setDescription] = useState('')
    const handler = useCallback((eventHandler: Function) => (ev: ChangeEvent<HTMLInputElement>) => eventHandler(ev.currentTarget.value), [])
    const hadlerSelect = useCallback((ev: ChangeEvent<HTMLSelectElement>) => setTypeVal(ev.target.value), [])

    useEffect(() => {
        if (!isTokenCorrect(true)) return navigate("/login")
        if (!type.length) dispatch(typeFetch())
    }, [])

    useEffect(() => {
        if (!type.length) dispatch(typeFetch())
    }, [type])

    useEffect(() => {
        if (created && !error && !pending) navigate(`/claims/${(totalItems / claimsPerPage) | 0}`)
    }, [error, pending, navigate, created, totalItems, claimsPerPage])

    const getSlug = (name: string) => type.find(el => el.name === name)?.slug

    const onCreate = () => {
        dispatch(createFetch({ type: getSlug(typeVal) || 'hard', description, status: 'new', title }))
        setCreated(true)
    }

    return <Layout>
        <div className={style.create}>
            <h1 className={style.create__title}>Creating new claim</h1>
            <Input label={"title"} value={title} onChange={handler(setTitle)} className={style.create__control} />
            <Select label={'type'} options={type.map(e => e.name)} onChange={hadlerSelect} className={style.create__control} />
            <Input label={"description"} value={description} onChange={handler(setDescription)} className={style.create__control} />
            <div className={style.create__controls}>
                <button className={style.create__cancel} onClick={() => navigate(-1)}>Cancel</button>
                <button className={style.create__create} onClick={onCreate}>Create</button>
            </div>
        </div>
    </Layout>
}