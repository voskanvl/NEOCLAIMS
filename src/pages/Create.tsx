import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { add } from "../app/claims"
import { clear, createFetch } from "../app/create"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { typeFetch } from "../app/type"
import { Aside } from "../features/aside/Aside"
import Header from "../features/header/Header"
import { Input } from "../features/input/Input"
import { Layout } from "../features/layout/Layout"
import { Select } from "../features/select/Select"
import style from "./styles/create.module.sass"

export const Create: FC = (props) => {
    const { type } = useAppSelector(state => state.type)
    const { created } = useAppSelector(state => state.create)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [typeVal, setTypeVal] = useState('')
    const [description, setDescription] = useState('')
    const handler = useCallback((eventHandler: Function) => (ev: ChangeEvent<HTMLInputElement>) => eventHandler(ev.currentTarget.value), [])
    const hadlerSelect = useCallback((ev: ChangeEvent<HTMLSelectElement>) => setTypeVal(ev.target.value), [])
    useEffect(() => {
        if (!type.length) dispatch(typeFetch())
    }, [])
    useEffect(() => {
        if (!type.length) dispatch(typeFetch())
    }, [type])

    useEffect(() => {
        if (Object.entries(created).length) {
            dispatch(add(created))
            dispatch(clear())
            navigate('/claims')
        }
    }, [dispatch, created])

    const getSlug = (name: string) => type.find(el => el.name === name)?.slug

    return <Layout>
        <div className={style.create}>
            <h1 className={style.create__title}>Creating new claim</h1>
            <Input label={"title"} value={title} onChange={handler(setTitle)} className={style.create__control} />
            <Select label={'type'} options={type.map(e => e.name)} onChange={hadlerSelect} className={style.create__control} />
            <Input label={"description"} value={description} onChange={handler(setDescription)} className={style.create__control} />
            <div className={style.create__controls}>
                <button className={style.create__cancel} onClick={() => navigate(-1)}>Cancel</button>
                <button className={style.create__create} onClick={() => dispatch(createFetch({ type: getSlug(typeVal) || 'hard', description, status: 'new', title }))}>Create</button>
            </div>
        </div>
    </Layout>
}