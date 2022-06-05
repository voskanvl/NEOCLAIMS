import { FC, FormEvent, FormEventHandler, useState, MouseEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../features/button/Button"
import { Input } from "../features/input/Input"
import style from "./login.module.sass"
import { login } from "../app/login"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { svg } from "../features/svg/svg"


export const Login: FC = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const user = useAppSelector(state => state.login.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (user.token && !user.error)
            navigate('/claims')
    }, [user])

    const inputHandler: FormEventHandler<HTMLInputElement> = (ev: FormEvent<HTMLInputElement>) => setEmail(ev.currentTarget.value)
    const handlerClick = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault()
        console.log(email, password)
        dispatch(login({ email, password }))
    }
    return <div className={style.screen}>
        <main className={style.layout}>
            {matchMedia('(min-width: 1024px)').matches &&
                <section className={style.layout__left}>
                    <img src="/cod_home_section2-1536x1491 1.svg" alt="big logo" />
                </section>
            }
            <section className={style.layout__right}>
                <form className={style.panel}>
                    <div>{svg.sloganBig}</div>
                    <Input svg={svg.email} label={"e-mail"} placeholder={"Type your e-mail"} onChange={ev => setEmail(ev.currentTarget.value)} />
                    <Input svg={svg.seal} label={"password"} placeholder={"Type your password"} onChange={ev => setPassword(ev.currentTarget.value)} />
                    <div className={style.checkbox}>
                        <div className={style.checkbox__decorator}>
                            <input className={style.checkbox__input} type="checkbox" />
                        </div>
                        <label className={style.checkbox__label}>Keep me logged in</label>
                    </div>
                    <Button label="Login" onClick={handlerClick} />
                    <div className={style.notAMember}>
                        Not a member? <Link to={"/auth"}>Request registration.</Link>
                    </div>
                </form>
            </section>
        </main>
        <footer className={style.footer}>
            <div className={style.fooler__logo}>{svg.sloganSvgFooter}</div>
        </footer>
    </div>
}