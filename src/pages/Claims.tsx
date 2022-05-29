import { FC, useEffect } from "react"
import { claimsFetch } from "../app/claims"
import { useAppDispatch, useAppSelector } from "../app/hooks"

export const Claims: FC = (props) => {
    const claims = useAppSelector(state => state.claims)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(claimsFetch())
    }, [])
    return <div>{JSON.stringify(claims)}</div>
}