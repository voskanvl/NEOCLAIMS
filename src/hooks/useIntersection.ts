import { useEffect } from 'react'
import { useRef, useState } from 'react'

export const useIntersection = () => {
    const [visible, setVisible] = useState(true)
    const [element, setElement] = useState<Element | null>(null)

    const observer = useRef(new IntersectionObserver(([{ isIntersecting }]) => {
        setVisible(isIntersecting)
    }))

    useEffect(() => {
        const { current: currentObserver } = observer
        currentObserver.disconnect()
        if (element) currentObserver.observe(element)
        return () => currentObserver.disconnect()
    }, [element])

    return { visible, setElement }
}