import { FC, FormEvent, FormEventHandler, useState } from "react"
import { Button } from "../features/button/Button"
import { Input } from "../features/input/Input"

const emailSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12H28C29.1 12 30 12.9 30 14V26C30 27.1 29.1 28 28 28H12C10.9 28 10 27.1 10 26V14C10 12.9 10.9 12 12 12Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M30 14L20 21L10 14" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
const seal = <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 19H13C11.8954 19 11 19.8954 11 21V28C11 29.1046 11.8954 30 13 30H27C28.1046 30 29 29.1046 29 28V21C29 19.8954 28.1046 19 27 19Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M15 19V15C15 13.6739 15.5268 12.4021 16.4645 11.4645C17.4021 10.5268 18.6739 10 20 10C21.3261 10 22.5979 10.5268 23.5355 11.4645C24.4732 12.4021 25 13.6739 25 15V19" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> </path>
</svg>
export const Login: FC = (props) => {
    const [email, setEmail] = useState("")
    const inputHandler: FormEventHandler<HTMLInputElement> = (ev: FormEvent<HTMLInputElement>) => setEmail(ev.currentTarget.value)
    const handlerClick = () => console.log('click')
    return <form>
        <div>{email}</div>
        <Input svg={emailSvg} label={"e-mail"} placeholder={"Type your e-mail"} onInput={inputHandler} />
        <Input svg={seal} label={"password"} placeholder={"Type your password"} />
        <Button label="Login" onClick={handlerClick} />
    </form>
}