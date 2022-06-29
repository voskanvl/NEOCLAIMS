import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { changeClaimFetch, currentClaimFetch } from "../../app/claim"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { statusFetch } from "../../app/status"
import { typeFetch } from "../../app/type"
import { Input } from "../../features/Input/Input"
import { Layout } from "../../features/Layout/Layout"
import { Select } from "../../features/Select/Select"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import claimStyle from "./Сlaim.module.sass"
import createStyle from "../Create/Create.module.sass"
import { claimsFetch } from "../../app/claims"

export const ClaimPage: FC = () => {
    const [title, setTitle] = useState("")
    const [typeVal, setTypeVal] = useState("")
    const [description, setDescription] = useState("")
    const { claimId } = useParams()
    const { currentClaim } = useAppSelector(state => state.currentClaim)
    const { type } = useAppSelector(state => state.type)
    const { role } = useAppSelector(state => state.login.user)
    const { status } = useAppSelector(state => state.status)
    const { page } = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isTokenCorrect(true) && claimId) dispatch(currentClaimFetch(claimId))
        if (isTokenCorrect(true) && claimId) dispatch(typeFetch())
    }, [dispatch, claimId])

    useEffect(() => {
        if (!isTokenCorrect(true)) return navigate("/login")
        setTitle(currentClaim.title)
        setTypeVal(currentClaim.type.name)
        setDescription(currentClaim.description)
    }, [currentClaim])

    useEffect(() => {
        if (!status.length) dispatch(statusFetch())
    }, [status, dispatch])

    const handler = useCallback((eventHandler: (arg0: string) => any) =>
        (ev: ChangeEvent<HTMLInputElement>) => eventHandler(ev.currentTarget.value), [])

    const changeStatus = (newStatus: string, done = true) => () => {
        const selectedStatus = status.find(e => e.name === newStatus || e.slug === newStatus)
        if (newStatus === "in-progress" && role.slug !== "admin") navigate(-1)
        if (selectedStatus) {
            dispatch(changeClaimFetch({ ...currentClaim, status: selectedStatus }))
            dispatch(claimsFetch())
            if (done) setTimeout(() => navigate("/claims/" + page), 200)
        }
    }

    return <Layout>
        <div className={claimStyle.claim__block}>
            <h1 className={claimStyle.claim__title}>Incoming claim</h1>
            <Input
                label={"title"}
                value={title}
                onChange={handler(setTitle)}
                className={claimStyle.claim__control} />
            <Select
                label={"type"} options={type.map(e => e.name)}
                defaultValue={typeVal}
                className={claimStyle.claim__control} />
            <Input
                label={"description"}
                value={description}
                onChange={handler(setDescription)}
                className={claimStyle.claim__control} />
            <div className={createStyle.create__controls}>
                <button
                    className={createStyle.create__cancel}
                    onClick={changeStatus("in-progress")}>
                    Cancel
                </button>
                <button
                    className={createStyle.create__create}
                    disabled={role.slug === "work"}
                    onClick={changeStatus("done")}>
                    Done
                </button>
                <button
                    className={createStyle.create__decline}
                    disabled={(role.slug === "work")}
                    onClick={changeStatus("decl")}>
                    Decline
                </button>
            </div>
        </div>
    </Layout>
}