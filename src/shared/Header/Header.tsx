import { FC, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { currentUser } from "../../store/loginThunks/currentUser"
import { toggle } from "../../store/showAside"
import { svg } from "../svg/svg"
import style from "./Header.module.sass"
import { reset as resetLogin } from "../../store/login"
import { reset as resetClaims } from "../../store/claims"

export const Header: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
    const userName = useAppSelector(state => state.login.user.fullName)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!userName && token) {
            const id = JSON.parse(atob(token.split(".")[1])).id
            dispatch(currentUser(id))
        }
    }, [userName, dispatch])

    const logout = () => {
        localStorage.clear()
        dispatch(resetLogin())
        dispatch(resetClaims())
        navigate("/login")
    }

    return <header className={style.header}>
        <button className={style.header__burger}
            onClick={() => dispatch(toggle())}>{svg.burger}</button>
        <div className={style.header__children}>{children}</div>
        <div className={style.header__bell}>{svg.bell}</div>
        <div className={style.header__face}></div>
        <div className={style.header__name}>{userName}</div>
        <button
            className={style.header__logout}
            onClick={logout}>{svg.logout}</button>
    </header>
}
