import { memo } from "react"
import style from "./Aside.module.sass"
import { svg, TSvg } from "../svg/svg"
import { useAppSelector } from "../../app/store"
import { useMediaMatch } from "../../hooks/useMediaMatch"

export const Aside = memo(() => {
    const match = useMediaMatch(1024)
    const refs: { slug: keyof TSvg, name: string }[] = [
        { slug: "home", name: "Home" },
        { slug: "globe", name: "Service" },
        { slug: "archive", name: "Storage" },
        { slug: "pieChart", name: "Charts" },
        { slug: "dollar", name: "Currency" },
        { slug: "database", name: "Base" },
        { slug: "navigation", name: "Navigation" }
    ]
    const show = useAppSelector(state => state.aside.show)

    return <div className={`${style.aside} ${show || !match ? "" : style.aside__hidden}`} >
        <a className={style.aside__slogan} href="#">{svg.slogan}</a>
        {
            refs.map(e => <a className={style.aside__item} href="#" key={e.slug}>
                <span className={style.aside__img}>{svg[e.slug]}</span>
                <span className={style.aside__name}>{e.name}</span>
            </a>)
        }
    </div >
})