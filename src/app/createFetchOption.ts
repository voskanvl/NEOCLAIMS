export function createFetchOption(): RequestInit {
    const token = localStorage.getItem("token");
    return {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        mode: "cors",
    };
}
