import { FC, MouseEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../shared/Button/Button"
import { Input } from "../../shared/Input/Input"
import style from "./Login.module.sass"
import footer from "./Footer.module.sass"
import checkbox from "./Сheckbox.module.sass"
import { loginFetch } from "../../store/loginThunks/loginFetch"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { svg } from "../../shared/svg/svg"
import { isTokenCorrect } from "../../helpers/isTokenCorrect"
import { useValidate, Valid } from "../../hooks/useValidate"
import { regFetch } from "../../store/loginThunks/regFetch"

type TLoginReg = {
    fullNameInput?: boolean,
}
export const LoginRegPage: FC<TLoginReg> = ({ fullNameInput }) => {
    const [{ fullName, email, password }, setAttribs] = useState<{
        fullName?: string,
        email?: string,
        password?: string
    }>({
        fullName: undefined,
        email: undefined,
        password: undefined
    })
    const [preload, setPreload] = useState<boolean>(false)

    const { valid: validFullName, validate: validateFullName } = useValidate()
    const { valid: validEMail, validate: validateEmail } = useValidate()
    const { valid: validPassword, validate: validatePassword } = useValidate()

    const user = useAppSelector(state => state.login.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (isTokenCorrect(true) && !user.error)
            navigate("/claims")
    }, [user, navigate])

    const validForm = (fullNameInput
        ? validFullName === Valid.valid
        : true) && validEMail === Valid.valid && validPassword === Valid.valid

    const submit = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault()
        if (validForm) {
            if (fullName && email && password) dispatch(regFetch({ fullName, email, password }))
            if (!fullName && email && password) dispatch(loginFetch({ email, password }))
            setPreload(true)
        }

    }
    return <div className={style.login__screen}>
        <main className={style.login__layout}>
            {matchMedia("(min-width: 1024px)").matches &&
                <section className={style.login__layoutLeft}>
                    <img src="/cod_home_section2-1536x1491 1.svg" alt="big logo" />
                </section>
            }
            <section className={style.login__layoutRight}>
                <form className={style.login__panel}>
                    <div>{svg.sloganColor}</div>
                    {fullNameInput && <Input
                        label="full name"
                        placeholder={"Type your full name"}
                        error={!validFullName}
                        errorName={"Full name must contain only letters and spaces"}
                        onChange={ev => setAttribs(state =>
                            ({ ...state, fullName: ev.target.value }))}
                        onInput={ev =>
                            validateFullName(ev.currentTarget.value, /[a-zA-Z|а-яёА-ЯЁ|\s]+/)}
                        onBlur={ev =>
                            validateFullName(ev.currentTarget.value, /[a-zA-Z|а-яёА-ЯЁ|\s]+/)}
                        className={style.login__control}
                        autoComplete={"name"}
                    />}
                    <Input
                        svg={svg.email}
                        label={"e-mail"}
                        placeholder={"Type your e-mail"}
                        error={!validEMail}
                        errorName={"Input correct e-mail"}
                        onChange={ev => setAttribs(state => ({ ...state, email: ev.target.value }))}
                        onInput={ev => validateEmail(ev.currentTarget.value, /\w.*@.+\..+/)}
                        onBlur={ev => validateEmail(ev.currentTarget.value, /\w.*@.+\..+/)}
                        className={style.login__control}
                        autoComplete={"email"}
                    />
                    <Input
                        svg={svg.seal}
                        label={"password"}
                        placeholder={"Type your password"}
                        error={!validPassword}
                        errorName={"The password must contain at least 6 characters"}
                        onChange={ev =>
                            setAttribs(state => ({ ...state, password: ev.target.value }))}
                        type="password"
                        onInput={ev => validatePassword(ev.currentTarget.value, /[\w|\d]{6,}/)}
                        onBlur={ev => validatePassword(ev.currentTarget.value, /[\w|\d]{6,}/)}
                        className={style.login__control}
                        autoComplete={"current-password"}
                    />
                    <div className={checkbox.checkbox}>
                        <div className={checkbox.checkbox__decorator}>
                            <input className={checkbox.checkbox__input} type="checkbox" />
                        </div>
                        <label className={checkbox.checkbox__label}>Keep me logged in</label>
                    </div>
                    <Button
                        label="Login"
                        onClick={submit}
                        preload={preload}
                        error={!!user.error}
                        errorMessage={user.error}
                        disabled={!validForm}
                    />
                    <div className={style.login__notAMember}>
                        Not a member? <Link to={"/reg"}>Request registration.</Link>
                    </div>
                </form>
            </section>
        </main>
        <footer className={footer.footer}>
            <div className={footer.fooler__logo}>{svg.sloganSvgFooter}</div>
        </footer>
    </div>
}