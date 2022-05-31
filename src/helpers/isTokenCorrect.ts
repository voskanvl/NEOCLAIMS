export function isTokenCorrect(reset?: boolean): boolean {
    const token: string | null = localStorage.getItem("token");
    const created = localStorage.getItem("created");
    if (!token || !created) return false;
    const middle = token!.split(".")[1];
    const toketJson = JSON.parse(atob(middle));
    const expired = +created + toketJson.exp - toketJson.iat;
    const isLive = Date.now() / 1000 < expired;
    if (!isLive && reset) {
        localStorage.removeItem("token");
        localStorage.removeItem("created");
    }
    return isLive;
}
