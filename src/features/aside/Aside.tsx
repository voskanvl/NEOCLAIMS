import { memo } from "react"
import style from "./aside.module.sass"
import { svg, TSvg } from "../svg/svg"
import { useAppSelector } from "../../app/hooks"

export const Aside = memo(() => {
    const refs: { slug: keyof TSvg, name: string }[] = [
        { slug: 'home', name: 'Home' },
        { slug: 'globe', name: 'Service' },
        { slug: 'archive', name: 'Storage' },
        { slug: 'pieChart', name: 'Charts' },
        { slug: 'dollar', name: 'Currency' },
        { slug: 'database', name: 'Base' },
        { slug: 'navigation', name: 'Navigation' }
    ]
    const show = useAppSelector(state => state.aside.show)
    const match = matchMedia('(max-width: 1024px)').matches
    const display = !(!show && match)
    return <div className={style.aside} style={{ display: display ? 'flex' : 'none' }}>
        <a className={style.aside__slogan} href="#">{svg.slogan}</a>
        {
            refs.map(e => <a className={style.aside__item} href="#" key={e.slug}>
                <span className={style.aside__img}>{svg[e.slug]}</span>
                <span className={style.aside__name}>{e.name}</span>
            </a>)
        }
    </div >
})