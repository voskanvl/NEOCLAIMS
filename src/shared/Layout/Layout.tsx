import { ReactNode } from "react"
import { FC } from "react"
import { useAppSelector } from "../../app/store"
import { Aside } from "../Aside/Aside"
import { Header } from "../Header/Header"
import style from "./Layout.module.sass"

type TLayout = {
    headerChildren?: ReactNode,
    children?: ReactNode
}
export const Layout: FC<TLayout> = ({ headerChildren, children }) => {
    const { show } = useAppSelector(state => state.aside)
    return <div className={style.layout__layout}>
        <Aside />
        <main className={style.layout__main}>
            <Header>
                {headerChildren}
            </Header>
            <div className={`${style.layout__common}`} >
                <div
                    className={`${style.layout} ${show ? style.layout__show : ""}`}></div>
                {children}
            </div>
        </main>
    </div>
}

