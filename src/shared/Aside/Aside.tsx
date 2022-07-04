import { memo } from "react"
import style from "./Aside.module.sass"
import { Svg, TSvg } from "../Svg/Svg"
import { useAppSelector } from "../../store/store"
import { useMediaMatch } from "../../hooks/useMediaMatch"

export const Aside = memo(function Aside() {
    const match = useMediaMatch(1024)
    const refs: { slug: keyof TSvg, name: string }[] = [
        { slug: "Home", name: "Home" },
        { slug: "Globe", name: "Service" },
        { slug: "Archive", name: "Storage" },
        { slug: "PieChart", name: "Charts" },
        { slug: "Dollar", name: "Currency" },
        { slug: "Database", name: "Base" },
        { slug: "Navigation", name: "Navigation" }
    ]
    const show = useAppSelector(state => state.aside.show)

    return <div className={`${style.aside} ${show || !match ? "" : style.aside__hidden}`} >
        <a
            className={style.aside__slogan}
            href="#">
            <Svg.Slogan />
        </a>
        {
            refs.map(({ slug, name }: {
                slug: keyof TSvg
                name: string
            }) =>
                <a
                    className={style.aside__item}
                    href="#"
                    key={String(slug)}>
                    <span className={style.aside__img}>
                        {Svg[slug]()}
                    </span>
                    <span className={style.aside__name}>{name}</span>
                </a>)
        }
    </div >
})