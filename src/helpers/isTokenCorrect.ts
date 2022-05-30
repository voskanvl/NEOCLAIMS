export function isTokenCorrect(): boolean {
    const token: string | null = localStorage.getItem("token");
    const created = localStorage.getItem("created");
    if (!token || !created) return false;
    const middle = token!.split(".")[1];
    const toketJson = JSON.parse(atob(middle));
    const expired = +created + toketJson.exp - toketJson.iat;
    return Date.now() / 1000 < expired;
}
