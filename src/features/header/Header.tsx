import { FC, memo, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { currentUser } from "../../app/login"
import { show } from "../../app/showAside"
import { svg } from "../svg/svg"
import style from "./header.module.sass"

const Header: FC<{ children?: ReactNode }> = ({ children }) => {
    let userName = useAppSelector(state => state.login.user.fullName)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!userName) {
            const id = JSON.parse(atob(token!.split(".")[1])).id
            console.log("🚀 ~ id", id)
            dispatch(currentUser(id))
        }
    }, [userName, dispatch])

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return <header className={style.header}>
        <button className={style.header__burger} onClick={() => dispatch(show())}>{svg.burger}</button>
        <div className={style.header__children}>{children}</div>
        <div className={style.header__bell}>{svg.bell}</div>
        <div className={style.header__face}></div>
        <div className={style.header__name}>{userName}</div>
        <button className={style.header__logout} onClick={logout}>{svg.logout}</button>
    </header>
}

export default memo(Header)