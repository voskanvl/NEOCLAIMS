import { FC, FormEvent, FormEventHandler, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../features/button/Button"
import { Input } from "../features/input/Input"
import style from "./login.module.sass"

const emailSvg = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <use xlinkHref="/icon-sprite.svg#mail"></use>
</svg>
const sealSvg = <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <use xlinkHref="/icon-sprite.svg#lock"></use>
</svg>
const sloganSvg = <svg width="165" height="161" viewBox="0 0 165 161">
    <use xlinkHref="/icon-sprite.svg#slogan"></use>
</svg>
const sloganSvgFooter = <svg width="59.44" height="58" viewBox="0 0 165 161" fill="#fff">
    <use xlinkHref="/icon-sprite.svg#sloganWhite"></use>
</svg>
export const Login: FC = (props) => {
    const [email, setEmail] = useState("")
    const inputHandler: FormEventHandler<HTMLInputElement> = (ev: FormEvent<HTMLInputElement>) => setEmail(ev.currentTarget.value)
    const handlerClick = () => console.log('click')
    return <div className={style.screen}>
        <main className={style.layout}>
            <section className={style.layout__left}>
                <img src="/cod_home_section2-1536x1491 1.svg" alt="big logo" />
            </section>
            <section className={style.layout__right}>
                <form className={style.panel}>
                    <div>{sloganSvg}</div>
                    <div>{email}</div>
                    <Input svg={emailSvg} label={"e-mail"} placeholder={"Type your e-mail"} onInput={inputHandler} />
                    <Input svg={sealSvg} label={"password"} placeholder={"Type your password"} />
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
            <div className={style.fooler__logo}>{sloganSvgFooter}</div>
        </footer>
    </div>
}