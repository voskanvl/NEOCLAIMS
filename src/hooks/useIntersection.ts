import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { debounce } from '../helpers/debounce'

export const useIntersection = (ms: number) => {
    const [visible, setVisible] = useState(true)
    const [element, setElement] = useState<Element | null>(null)

    const observer = useRef(new IntersectionObserver(
        debounce((entries: IntersectionObserverEntry[]) => { setVisible(entries[0].isIntersecting) }, ms) as IntersectionObserverCallback
    ))

    useEffect(() => {
        const { current: currentObserver } = observer
        currentObserver.disconnect()
        if (element) currentObserver.observe(element)
        return () => currentObserver.disconnect()
    }, [element])

    return { visible, setElement }
}