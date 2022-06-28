export function debounce(cb: (...args: any[]) => void, time: number): (...args: any[]) => void {
    let flag = true
    return function (...args: any[]) {
        if (!flag) return
        flag = false
        cb(...args)
        setTimeout(() => (flag = true), time)
    }
}
