export function isTokenCorrect(reset?: boolean): boolean {
    const token: string | null = localStorage.getItem("token")
    const created = localStorage.getItem("created")
    if (!token || !created) return false
    const middle = token?.split(".")[1]
    const toketJson = JSON.parse(atob(middle))
    const expired = +created + toketJson.exp * 1000 - toketJson.iat * 1000
    const isLive = Date.now() < expired
    if (!isLive && reset) {
        localStorage.removeItem("token")
        localStorage.removeItem("created")
    }
    return isLive
}
