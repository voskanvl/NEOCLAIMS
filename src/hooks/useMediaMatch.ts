import { useState } from "react"

export const useMediaMatch = (resolution: number) => {
    const [match, setMatch] = useState(false)
    window.onresize = () => {
        const result = matchMedia(`(max-width: ${resolution}px)`).matches
        setMatch(result)
    }
    return match
}