import { useState } from "react"
import { debounce } from "../helpers/debounce"

export const useMediaMatch = (resolution: number) => {
    const requestMatch = () => matchMedia(`(max-width: ${resolution}px)`).matches
    const [match, setMatch] = useState(requestMatch());
    (window.onresize as Function) = debounce(() => {
        const result = requestMatch()
        setMatch(result)
    }, 200)
    return match
}