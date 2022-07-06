import { ReactNode } from "react"
import { FC } from "react"
import { useMediaMatch } from "../../hooks/useMediaMatch"
import { useAppSelector } from "../../store/store"
import { Aside } from "../Aside/Aside"
import { Header } from "../Header/Header"
import style from "./Layout.module.sass"


type TLayout = {
    headerChildren?: ReactNode,
    children?: ReactNode,
    footer?: ReactNode,
}
export const Layout: FC<TLayout> = ({ headerChildren, children, footer }) => {
    const { show } = useAppSelector(state => state.aside)
    const match = useMediaMatch(1024)
    console.log("🚀 ~ match", match)
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
        {!match &&
            <footer>
                {footer}
            </footer>}
    </div>
}

