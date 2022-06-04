import { memo } from "react"
import style from "./aside.module.sass"
import { svg } from "../svg/svg"

export const Aside = () => {
    const refs: { slug: string, name: string }[] = [
        { slug: 'home', name: 'Home' },
        { slug: 'globe', name: 'Service' },
        { slug: 'archive', name: 'Storage' },
        { slug: 'pieChart', name: 'Charts' },
        { slug: 'dollar', name: 'Currency' },
        { slug: 'database', name: 'Base' },
        { slug: 'navigation', name: 'Navigation' }
    ]
    return <div className={style.aside}>
        <a className={style.slogan} href="#">{svg.slogan}</a>
        {
            refs.map(e => <a className={style.item} href="#">
                <span className={style.img}>{svg[e.slug]}</span>
                <span className={style.name}>{e.name}</span>
            </a>)
        }
    </div>
}