import { FC, FormEvent, FormEventHandler, useState, MouseEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../features/button/Button"
import { Input } from "../features/input/Input"
import style from "./login.module.sass"
import { loginFetch, regFetch } from "../app/login"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { svg } from "../features/svg/svg"

type TLoginReg = {
    FullNameInput?: typeof Input,
}
export const LoginReg: FC<TLoginReg> = ({ FullNameInput }) => {
    const [{ fullName, email, password }, setAttribs] = useState<{ fullName?: string, email?: string, password?: string }>({ fullName: undefined, email: undefined, password: undefined })
    const [preload, setPreload] = useState<boolean>(false)

    const user = useAppSelector(state => state.login.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (user.token && !user.error)
            navigate('/claims')
    }, [user])

    const handlerClick = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault()
        if (fullName && email && password) dispatch(regFetch({ fullName, email, password }))
        if (!fullName && email && password) dispatch(loginFetch({ email, password }))

        setPreload(true)
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
                    <div>{svg.sloganColor}</div>
                    {/* <Input svg={svg.name} label={"full name"} placeholder={"Type your full name"} onChange={ev => setAttribs(state => ({ ...state, fullName: ev.currentTarget.value }))} /> */}
                    {FullNameInput && <FullNameInput label="full name" placeholder={"Type your full name"} onChange={ev => setAttribs(state => ({ ...state, fullName: ev.currentTarget.value }))} />}
                    <Input svg={svg.email} label={"e-mail"} placeholder={"Type your e-mail"} onChange={ev => setAttribs(state => ({ ...state, email: ev.currentTarget.value }))} />
                    <Input svg={svg.seal} label={"password"} placeholder={"Type your password"} onChange={ev => setAttribs(state => ({ ...state, password: ev.currentTarget.value }))} type="password" />
                    <div className={style.checkbox}>
                        <div className={style.checkbox__decorator}>
                            <input className={style.checkbox__input} type="checkbox" />
                        </div>
                        <label className={style.checkbox__label}>Keep me logged in</label>
                    </div>
                    <Button label="Login" onClick={handlerClick} preload={preload} error={!!user.error} errorMessage={user.error} />
                    <div className={style.notAMember}>
                        Not a member? <Link to={"/reg"}>Request registration.</Link>
                    </div>
                </form>
            </section>
        </main>
        <footer className={style.footer}>
            <div className={style.fooler__logo}>{svg.sloganSvgFooter}</div>
        </footer>
    </div>
}