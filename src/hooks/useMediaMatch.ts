import { useEffect, useRef, useState } from "react"
import { debounce } from "../helpers/debounce"

export const useMediaMatch = (resolution: number) => {
    const requestMatch = () => matchMedia(`(max-width: ${resolution}px)`).matches
    const [match, setMatch] = useState(requestMatch())
    // (window.onresize as Function) = debounce(() => {
    //     const result = requestMatch()
    //     setMatch(result)
    // }, 200)

    const handleMatch = useRef(debounce(() => {
        const result = requestMatch()
        setMatch(result)
    }, 200))

    useEffect(() => {
        window.addEventListener("resize", handleMatch.current as EventListenerOrEventListenerObject)
        return () => {
            window.removeEventListener("resize", handleMatch.current as EventListenerOrEventListenerObject)
        }
    }, [requestMatch])

    return match
}