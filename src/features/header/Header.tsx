import { FC, memo, ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { currentUser } from "../../app/login"
import { show } from "../../app/showAside"
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
        <button className={style.burger} onClick={() => dispatch(show())}>{svg.burger}</button>
        <div className={style.children}>{children}</div>
        <div className={style.bell}>{svg.bell}</div>
        <div className={style.face}></div>
        <div className={style.name}>{userName}</div>
        <div className={style.logout}>{svg.logout}</div>
    </header>
}

export default memo(Header)