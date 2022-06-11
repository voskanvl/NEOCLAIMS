import { ReactNode, memo } from "react"
import { FC } from "react"
import { Aside } from "../aside/Aside"
import Header from "../header/Header"
import style from "./layout.module.sass"

type TLayout = {
    headerChildren?: ReactNode,
    children?: ReactNode
}
export const Layout: FC<TLayout> = memo(({ headerChildren, children }) => {
    return <div className={style.layout__layout}>
        <Aside />
        <main className={style.layout__main}>
            <Header>
                {headerChildren}
            </Header>
            {children}
        </main>
    </div>
})

