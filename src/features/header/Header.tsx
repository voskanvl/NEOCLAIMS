import { FC, memo, ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { currentUser } from "../../app/login"
import { svg } from "../svg/svg"
import style from "./header.module.sass"

const Header: FC<{ children: ReactNode }> = ({ children }) => {
    let userName = useAppSelector(state => state.login.user.fullName)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!userName) {
            const id = JSON.parse(atob(token!.split(".")[1])).id
            console.log("🚀 ~ id", id)
            dispatch(currentUser(id))
        }
    }, [userName])

    return <header className={style.header}>
        <span className={style.children}>{children}</span>
        <div>{svg.bell}</div>
        <div className={style.face}></div>
        <div>{userName}</div>
        <div className="logout">{svg.logout}</div>
    </header>
}

export default memo(Header)