import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { add } from "../app/claims"
import { clear, createFetch } from "../app/create"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { typeFetch } from "../app/type"
import { Input } from "../features/input/Input"
import { Select } from "../features/select/Select"

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
    }, [type])

    useEffect(() => {
        if (Object.entries(created).length) {
            dispatch(add(created))
            dispatch(clear())
            navigate('/claims')
        }
    }, [dispatch, created])

    useEffect(() => {
        console.log('title,typeVal,description', getSlug(typeVal), title, typeVal, description)
    }, [title, typeVal, description])

    const getSlug = (name: string) => type.find(el => el.name === name)!.slug
    return <>
        <Input label={"title"} value={title} onChange={handler(setTitle)} />
        <Select label={'type'} options={type.map(e => e.name)} onChange={hadlerSelect} />
        <Input label={"description"} value={description} onChange={handler(setDescription)} />
        <div className="row">
            <button className="create__cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button className="create__create" onClick={() => dispatch(createFetch({ type: getSlug(typeVal), description, status: 'new', title }))}>Create</button>
        </div>
    </>
}