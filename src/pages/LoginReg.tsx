import { FC, MouseEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../features/button/Button"
import { Input } from "../features/input/Input"
import style from "./login.module.sass"
import { loginFetch, regFetch } from "../app/login"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { svg } from "../features/svg/svg"
import { isTokenCorrect } from "../helpers/isTokenCorrect"
import { useValidate, Valid } from "../hooks/useValidate"

type TLoginReg = {
    fullNameInput?: boolean,
}
export const LoginReg: FC<TLoginReg> = ({ fullNameInput }) => {
    const [{ fullName, email, password }, setAttribs] = useState<{ fullName?: string, email?: string, password?: string }>({ fullName: undefined, email: undefined, password: undefined })
    const [preload, setPreload] = useState<boolean>(false)

    const { valid: validFullName, validate: validateFullName } = useValidate()
    const { valid: validEMail, validate: validateEmail } = useValidate()
    const { valid: validPassword, validate: validatePassword } = useValidate()

    const user = useAppSelector(state => state.login.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (isTokenCorrect(true) && !user.error)
            navigate('/claims')
    }, [user])

    const validForm = validFullName === Valid.valid && validEMail === Valid.valid && validPassword === Valid.valid

    const submit = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault()
        if (validForm) {
            if (fullName && email && password) dispatch(regFetch({ fullName, email, password }))
            if (!fullName && email && password) dispatch(loginFetch({ email, password }))
            setPreload(true)
        }

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
                    {fullNameInput && <Input
                        label="full name"
                        placeholder={"Type your full name"}
                        error={!!validFullName}
                        errorName={'Ошибка'}
                        onChange={ev => setAttribs(state => ({ ...state, fullName: ev.target.value }))}
                        onInput={ev => validateFullName(ev.currentTarget.value, /[a-zA-Z|а-яёА-ЯЁ|\s]+/)}
                        onBlur={ev => validateFullName(ev.currentTarget.value, /[a-zA-Z|а-яёА-ЯЁ|\s]+/)}
                    />}
                    <Input
                        svg={svg.email}
                        label={"e-mail"}
                        placeholder={"Type your e-mail"}
                        error={!!validEMail}
                        errorName={'Ошибка'}
                        onChange={ev => setAttribs(state => ({ ...state, email: ev.target.value }))}
                        onInput={ev => validateEmail(ev.currentTarget.value, /\w.*@.+\..+/)}
                        onBlur={ev => validateEmail(ev.currentTarget.value, /\w.*@.+\..+/)}
                    />
                    <Input
                        svg={svg.seal}
                        label={"password"}
                        placeholder={"Type your password"}
                        error={!!validPassword}
                        errorName={'Ошибка'}
                        onChange={ev => setAttribs(state => ({ ...state, password: ev.target.value }))}
                        type="password"
                        onInput={ev => validatePassword(ev.currentTarget.value, /[\w|\d]{6,}/)}
                        onBlur={ev => validatePassword(ev.currentTarget.value, /[\w|\d]{6,}/)}
                    />
                    <div className={style.checkbox}>
                        <div className={style.checkbox__decorator}>
                            <input className={style.checkbox__input} type="checkbox" />
                        </div>
                        <label className={style.checkbox__label}>Keep me logged in</label>
                    </div>
                    <Button label="Login" onClick={submit} preload={preload} error={!!user.error} errorMessage={user.error} disabled={(validFullName + validEMail + validPassword) !== 3} />
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